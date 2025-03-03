import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import { useGameContext } from "../../../hooks/useGameContext";

const NavPage = ({ GameUiLinks }) => {

    const {  setGameModes, setGameType, isMultiplayer, setIsMultiplayer} = useGameContext()

    const linkList = GameUiLinks.length ? (
        GameUiLinks.map( link => {
            return (
                <li className="link" 
                    onClick={() => {
                        link.gtype ? console.log(link.to) : console.log("no type")
                        link.gtype ? setGameType(link.to) : setGameType(null)

                        if(link.gtype) {      
                            link.to === "single-player" ? setIsMultiplayer(false) : setIsMultiplayer(true)
                        }
                        console.log("Multiplayer = " + isMultiplayer);

                        link.gmode ? setGameModes(link.to) : setGameModes("null")
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