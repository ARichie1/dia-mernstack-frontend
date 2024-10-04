import React, { useEffect, useState } from "react";
import socketInService from "../../../hooks/connections/socketService";
import { useGameContext } from "../../../hooks/useGameContext";
import socketGameService from "../../../hooks/connections/gameService";
import { useAppGlobalVariableContext } from "../../../hooks/useAppGlobalVariableContext";
import { useNavigate } from "react-router-dom";

const JoinPage = ({ PLAYERS }) => {
    const navigate = useNavigate()

    const {assetsFolder, defaultImage} = useAppGlobalVariableContext()
    const imageSource = "images/faces/"
    const {setIsHost, setIsJoin,
        isInRoom, setIsInRoom} = useGameContext()
    
    const [selectedHost, setSelectedHost] = useState({
        active: false,
        selectedHostDetails: {
            name : "None Selected",
            image : `${assetsFolder + imageSource + defaultImage}`
        }
    })
    const [showHostList, setShowHostList] = useState({
        opened: false,
        buttonColor: "var(--themeColor)",
        buttonBackground: "transparent"
    })
    
    const toggleHostList = () => {
        setShowHostList({
            opened: !showHostList.opened,
            buttonColor: showHostList.buttonColor === "var(--themeColor)" ? "#000" : "var(--themeColor)",
            buttonBackground: showHostList.buttonBackground === "transparent" ? "var(--themeColor)" : "transparent"
        })
    }

    const [hosts, setHosts] = useState(null)

    const [roomId, setRoomId] = useState("")
    const [hasRoomId, setHasRoomId]= useState(false)
    const [isJoiningRoom, setIsJoiningRoom] = useState(false)
    const [isFetchingHost, setIsFetchingHost] = useState(false)
    const getAvailableHosts = async () => {
        const socket = socketInService.socket
        if (!socket) return;

        setIsFetchingHost(true)

        const datas =  await socketGameService.getHosts()
        .then((data) => {
            console.log("data : ", data);
            setIsFetchingHost(false)
            console.log("Fetched Hosts");
            setHosts(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        // if (showHostList.opened) {
            getAvailableHosts()
        //     console.log("fetched");
        // }        
    }, [])

    const selectHost = (host) => {
        setSelectedHost({
            active: true,
            selectedHostDetails: {
                name : roomId,
                image : `${assetsFolder + imageSource + host.image}`
            }
        })
        setRoomId(host.roomId)
        setHasRoomId(true)
        console.log(host.roomId);

        toggleHostList()
    }

    const joinRoom = async () => {
        const socket = socketInService.socket
        if (!roomId || roomId.trim === "" || !socket) return;

        setIsJoiningRoom(true)
        console.log("I am Joining this room : ", roomId);
        

        socket.sendBuffer = [];
        const joined = await socketGameService.joinGameRoom(socket, roomId)
        // .then(() => {
        //     setIsInRoom(true)
        //     setIsJoiningRoom(false)
        //     setIsHost(false)
        //     setIsJoin(true)
        //     navigate("/game/multiplayer/face-off")
        // })
        .catch((err) => {
            console.log(err)
        })

        if (joined) {
            setIsInRoom(true)
            setIsJoiningRoom(false)
            setIsHost(false)
            setIsJoin(true)
            navigate("/game/multiplayer/face-off")
        }else{
            console.log("Cant join for some reason :(");
        }
    }

    const hostsList = hosts ? hosts.map(host => {
        return (
            <li className="host" 
                id={host.hostId} 
                key={host.hostId}
                onClick={() => selectHost(host)}>
                <div className="hostImg">
                    <img src={`${assetsFolder + imageSource + host.image}`} alt="host_img"/>
                </div>
                <p className="hostRoomId">{host.roomId}</p>
            </li>   
        )
    }) : null

    return (
        <div className="multiplayerHostSelect wrapper">
            <div className="setHost">
                <div className="selectHost" id="selectHost">
                    <div className="chooseHostButton" 
                        onClick={ () => {
                            toggleHostList()
                        }}>
                        <span>&#11015;</span><span>CLICK TO CHOOSE HOST</span><span>&#11015;</span>
                    </div>
                    <div className="selectedHost">
                        <p>HOST : </p>
                        <span><img src={`${selectedHost.selectedHostDetails.image}`}
                         className="hostImg" alt="" />
                         <em>{selectedHost.selectedHostDetails.name}</em></span>
                    </div>
                    {selectedHost.active &&  (
                        <div className="selectedDifficultyByHost">
                            <p>DIFFICULTY : </p>
                            <span>HARD</span>
                        </div>
                    )}
                    {showHostList.opened &&  (
                        <ul className="hosts"
                            style={hosts && {overflowY: `${hosts.length > 3 ? "scroll" : "none"}`}}>
                            
                            <li className="hostUsernameSearchWrapper">
                                <input type="search" placeholder="Search Username"/>
                                <button>🔍</button>
                            </li>
                            <li onClick={() => getAvailableHosts()}>Refresh</li>
                            
                            {hostsList}
                        </ul>
                    )}
                </div>
                {hasRoomId && <div className="nextToHostButton"
                    onClick={() => joinRoom()}>
                    {isJoiningRoom ? "Joining..." : "Join"}
                </div>}
            </div>
        </div>
    )
}

export default JoinPage