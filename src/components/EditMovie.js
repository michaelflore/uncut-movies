import React, { useState, useEffect } from 'react';
import {useRouteMatch, useHistory, Link} from "react-router-dom";
import MovieForm from "./MovieForm";
import { getMovie, updateMovie } from "../api";

function EditMovie() {

    const history = useHistory();
    const match = useRouteMatch();
    const [movie, setMovie] = useState();
console.log(movie);
    //On Mount
    useEffect(() => {
        const fetchTodo = async () => {
            const movie = await getMovie(match.params.id);
            setMovie(movie);
        };
        fetchTodo();
    }, []);

    const onSubmit = async (data) => {
        await updateMovie(data, match.params.id);
        history.push("/");
    };

    return (
        movie ?
            (<div className="container">
                <div className="mt-3">
                    <h3>Edit Movie Info</h3>
                    <MovieForm movie={movie} onSubmit={onSubmit}/>
                    <Link to="/">Cancel</Link>
                </div>
            </div>) : (<div>Loading...</div>)
    );
}

export default EditMovie;