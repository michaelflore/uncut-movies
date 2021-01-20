import React, {useState} from 'react';
import { useForm } from "react-hook-form";

function MovieForm({ movie, onSubmit }) {
console.log(movie);

    //UseForm
    const { register, handleSubmit } = useForm(
        {
            defaultValues: { name: movie ? movie.name : ''
        }
    });

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    console.log(file)

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    //Function for form onSubmit using hook
    const submitHandler = handleSubmit((data => {
        console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image[0]);

        for (const formElement of formData) {
            console.log(formElement);
        }
        onSubmit(formData);
    }));

    return (
        <form onSubmit={submitHandler} encType='multipart/form-data'>
            <div className="form-group">
                <label htmlFor="text" className="form-text">Movie Name:</label>
                <input className="form-control" ref={register} type="text" name="name" id="name" required/>
            </div>
            <div className="form-group">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" ref={register} accept=".png, .jpg, .jpeg" name="image" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">{fileName !== '' ? fileName : 'Select Image'}</label>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">{movie ? 'Update' : 'Add Movie'}</button>
            </div>
        </form>
    );
}

export default MovieForm;