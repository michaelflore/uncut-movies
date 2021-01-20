const express = require("express");
const cors = require("cors");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const Movie = require("./models/Movie");

require('dotenv').config();

//Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB Connection established successfully");
});

const app = express();

app.use(cors());
app.use(express.json());

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});
const s3 = new aws.S3();

let upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null,  "uploads/" + uuidv4() + file.originalname)
        }
    }),
    limits: {
        fileSize: 1000000 * 2 //2MB
    }
})

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../public/uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// });

const singleFileUpload = upload.single("image");

function uploadToS3(req, res){
    req.s3Key = uuidv4();

    let downloadUrl = `https://s3-${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${req.s3Key}`;

    return new Promise((resolve, reject) => {
        return singleFileUpload(req, res, err => {
            if(err) {
                return reject(err);
            }
            return resolve(downloadUrl);
        })
    })
}

// const upload = multer({storage: storage});

//Get list of items
app.get("/", (req, res) => {
    Movie.find((err, movies) => {
        if(err) {
            console.log(err);
        } else {
            res.json(movies);
        }
    })
});

//Add a Movie
app.post("/add", singleFileUpload,(req, res) => {
    console.log("The file you uploaded: " + req.file)

    const newUserData = {
        name: req.body.name,
    };

    if(typeof req.file !== "undefined") {

        newUserData["image"] = req.file.location;
        newUserData["imageKey"] = req.file.key;

        uploadToS3(req, res)
            .then(downloadUrl => {
                console.log(downloadUrl)
            })
            .catch(e => console.log(e))
    }

    const movie = new Movie(newUserData);

    movie.save()
        .then((movie) => {
            res.json(movie)
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

//Get a specific Movie for the Edit
app.get("/:id", (req, res) => {
    const id = req.params.id;

    Movie.findById(id, (err, movie) => {
        res.json(movie);
    })
});

//Edit Movie
app.post("/:id", singleFileUpload, (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newFile = req.file;

    uploadToS3(req, res)
        .then(downloadUrl => {
            console.log("DownloadUrl: " + downloadUrl)

            Movie.findById(id, (err, movie) => {
                if(!movie) {
                    res.status(404).send("Movie not found");
                }
                else {

                    if(typeof newFile !== "undefined") {
                        movie.image = newFile.location;
                        movie.imageKey = newFile.key;
                    }

                    movie.name = newName;

                    movie.save().then(movie => {
                        res.json(movie);
                    }).catch((err) => res.status(500).send(err.message))
                }
            })
        })
        .catch(e => console.log(e))
});

//Delete Movie
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await Movie.findByIdAndRemove(id, (err, result, next) => {
        if(err) {
            return next(err);
        }

        let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: result.imageKey
        };

        s3.deleteObject(params, (err, data) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send({ status: "200", responseType: "string", response: "success"})
            }
        })
    }).exec();

});

app.listen(process.env.PORT, () => {
    console.log("Server Running");
});