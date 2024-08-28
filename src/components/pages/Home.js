import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


// C:/Users/arichie/Documents/Programming Files/Web Dev/My Tutorials/React and Redux Course/react_redux_course/lesson_10/myapp/src
class Home extends Component {
    state = {
        menus: []
    }

    render () {
        return (
        <div className="container-fluid home">
            <Navbar />
            <Outlet />
        </div> 
        )
    }
}

export default Home