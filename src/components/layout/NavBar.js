import React from 'react';
import {Link} from "react-router-dom";

function NavBar({ setActive, active }) {

    let links = [
        {
            id: 1,
            to: "/",
            title: "All Movies"
        },
        {
            id: 2,
            to: "/add",
            title: "Add Movie"
        }
    ]

    const handleClick = id => {
        setActive(id);
    };

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav mr-auto">
                {
                    links.map(item => (
                        <li className="navbar-item" key={item.id}>
                            <Link to={item.to} className={item.id === active ? 'nav-link active' : 'nav-link'} onClick={() => handleClick(item.id)}>{item.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

export default NavBar;