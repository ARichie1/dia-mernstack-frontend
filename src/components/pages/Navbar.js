import React from "react";
import { NavLink} from "react-router-dom";

const Navbar = (props) => {

    const user = false
    return (
        <nav className="landing_nav">
            <div className="brand_logo nav_children">
                <a href="/">WTF</a>
            </div>
            <ul className="pageLinks nav_children">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="authLinks nav_children">
                {!user && 
                    (<ul><li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li></ul>)}
                {user && 
                    (<ul><li><NavLink to="/game/settings/profile">Maxx</NavLink></li>
                        <li><NavLink to="/logout">Log Out</NavLink></li></ul>)}
            </div>
         </nav>
    )
}

// export default withRouter(Navbar)
export default Navbar