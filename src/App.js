import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
// import {v4 as uuid} from "uuid";

import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import "./App.css";

// import Counter from "./components/pages/Counter";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";

function App() {
    return (
        <React.Fragment>
            <Header/>
            <NavBar />
            <Switch>
                <Route exact path="/" component={MovieList} />
                <Route path="/edit/:id" component={EditMovie} />
                <Route path="/add" component={AddMovie}/>
            </Switch>
            <Footer/>
        </React.Fragment>
    );
}

export default App;