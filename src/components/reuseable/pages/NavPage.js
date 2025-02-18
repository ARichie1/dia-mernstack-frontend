import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import { useGameContext } from "../../../hooks/useGameContext";

const NavPage = ({ GameUiLinks }) => {

    const { setGameType, setGameMode} = useGameContext()

    const linkList = GameUiLinks.length ? (
        GameUiLinks.map( link => {
            return (
                <li className="link" 
                    onClick={() => {
                        link.gtype ? console.log(link.to) : console.log("no type")
                        link.gtype ? setGameType(link.to) : setGameType(null)
                        link.gmode ? setGameMode(link.to) : setGameMode(null)
                    }}
                    key={link.id}>
                    <NavLink to={link.to}>{link.title}</NavLink>
                </li>
            )
        })
    ) : ( <div className="center">No Links Yet</div> )

    return (
        <div className="navUlWrapper">
            <ul className="navUl">{linkList}</ul>
        </div>
    )
}

export default NavPage