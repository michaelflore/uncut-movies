import React from 'react';
import { useHistory } from "react-router-dom";

import MovieForm from "./MovieForm";
import { createMovie } from "../api";

function AddMovie() {
    const history = useHistory();

    //Passing onSubmit prop to MovieForm which then calls api
    const onSubmit =  async (data) => {

        await createMovie(data);
        history.push("/");
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