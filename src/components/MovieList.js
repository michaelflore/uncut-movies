import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {getMovies, deleteMovie } from "../api";

function MovieList() {

    const [items, setItems] = useState([]);
    console.log(items)

    const [filtered, setFiltered] = useState([]);

    const fetchItems = async () => {
        const movies = await getMovies();
        setItems(movies);
        setFiltered(movies);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const deleteMov =  async (id) => {
        await deleteMovie(id);
        fetchItems();
    };

    const onKeyUp = (e) => {
        let value = e.target.value.toLowerCase();

        let newItems = items.filter(item => {
            return item.name.toLowerCase().includes(value) === true;
        });

        setFiltered(newItems);
    };


    return (
        <div className="container-fluid">
            <div className="mt-3 mb-3">
                <h3 className="text-center">Movie List</h3>
                <input className="form-control" id="myInput3" type="text" placeholder="Search.." onKeyUp={(e) => onKeyUp(e)}/>
                    <div className="d-flex flex-wrap">
                    {
                        //Each table row has its own unique key
                        filtered.map((item) => (
                            <div key={item._id} className="card bg-light m-3">
                                <img className="card-img-top" src={`${item.image}`} alt="Card image"/>
                                <div className="card-body">
                                    <h4 className="card-title ">{item.name}</h4>
                                </div>
                                <div className="card-footer bg-light">
                                    <div className="d-flex justify-content-between">
                                        <div><Link to={`/edit/${item._id}`} className="btn btn-primary">Edit</Link></div>
                                        <button onClick={() => deleteMov(item._id) } className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
            </div>
        </div>
    );
}

export default MovieList;
