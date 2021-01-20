export const getMovies = () => fetch("http://localhost:4000/").then(res => res.json())

//Add a movie
export const createMovie = (data) => fetch("http://localhost:4000/add", {
    method: "POST",
    headers: {
        "Accept": "application/json"
    },
    body: data
});

//Edit Movie
export const updateMovie = (data, id) => fetch(`http://localhost:4000/${id}`, {
    method: "POST",
    headers: {
        "Accept": "application/json"
    },
    body: data
}).then(res => res.json())

export const getMovie = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json())

export const deleteMovie = (id) => fetch(`http://localhost:4000/delete/${id}`, {
    method: "DELETE"
})