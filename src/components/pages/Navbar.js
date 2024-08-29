import React, { useContext, useState } from "react";
import { NavLink} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (props) => {
    const [mobileMenuPos, setMobileMenuPos] = useState("-100%")
    const toggleMobileMenu = () => {
        setMobileMenuPos(mobileMenuPos === "-100%" ? "0%" : "-100%")
    }

    const [user, setUser] = useState(true)
    const { profileImage } = useContext(AuthContext)
    return (
        <nav className="landing_nav">
            <div className="brand_logo nav_children">
                <a href="/">WTF</a>
            </div>
            <div className="navLinks"
                onClick={() => toggleMobileMenu()}
                style={{right: `${mobileMenuPos}`}}>
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
                        (<ul>
                            <li>
                                <NavLink to="/game/settings/profile">
                                    <img src={`../../../assets/images/faces/${profileImage.name}`} alt="profileimage" /> 
                                    &nbsp; <p>Maxx400</p>
                                </NavLink>
                            </li>
                            <li onClick={() => setUser(false)}>
                                <NavLink to="">Log Out</NavLink>
                            </li>
                        </ul>)}
                </div>
            </div>
            <div className="mobileMenuBtn"
                onClick={() => toggleMobileMenu()}
                >🔳
            </div>
         </nav>
    )
}

// export default withRouter(Navbar)
export default Navbar