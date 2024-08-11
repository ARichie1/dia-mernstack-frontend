import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


// C:/Users/arichie/Documents/Programming Files/Web Dev/My Tutorials/React and Redux Course/react_redux_course/lesson_10/myapp/src
class Home extends Component {
    state = {
        menus: []
    }

    render () {
        return (
        <div className="container-fluid">
            <Navbar />
            <h1>WELCOME TO WTF</h1>
            <Link to="/game">
                <button>Lets Go The Fuvk</button>
            </Link>
            
        </div> 
        )
    }
}

export default Home