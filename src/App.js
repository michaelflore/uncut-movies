import React, {Fragment, useState} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import {v4 as uuid} from "uuid";

import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import "./App.css";

import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";

function App() {

    const [active, setActive] = useState(1);

    return (
        <Fragment>
            <Header/>
            <NavBar setActive={setActive} active={active} />
            <Switch>
                <Route exact path="/" render={() => {
                    return <MovieList />
                }} />
                <Route path="/add" render={() => {
                    if(active === 1) {
                        return <Redirect to="/" />
                    } else {
                        return <AddMovie setActive={setActive} />
                    }
                }}/>
                <Route path="/edit/:id" component={EditMovie} />
            </Switch>
            <Footer/>
        </Fragment>
    );
}

export default App;