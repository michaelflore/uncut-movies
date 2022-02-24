import React from 'react';

import MovieForm from "./MovieForm";
import { createMovie } from "../api";

function AddMovie({ setActive }) {

    //Passing onSubmit prop to MovieForm which then calls api
    const onSubmit =  async (data) => {
        await createMovie(data).then(() => setActive(1));
    };

    return (
        <div className="container">
            <div className="mt-3">
                <h3>Add a Movie</h3>
                <MovieForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

export default AddMovie;