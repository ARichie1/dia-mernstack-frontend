import React from "react";
import { NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="nav-wrapper red darken-3 landing">
            <div className="container">
                <a href="/" className="brand-logo left">WTF</a>
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </div> 
         </nav>
    )
}

// export default withRouter(Navbar)
export default Navbar