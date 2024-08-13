import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class NavPage extends Component {

    render () {
        const { links } = this.props

        const linkList = links.length ? (
            links.map( link => {
                return (
                    <li className="link" key={link.id}>
                        <NavLink to={link.to}>{link.title}</NavLink>
                    </li>
                )
            })
        ) : ( <div className="center">No Links Yet</div> )

        return (<div className="navUlWrapper"><ul className="navUl">{linkList}</ul></div> )
    }
}

export default NavPage