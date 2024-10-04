import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomForm from "../form_elements/CustomForm";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";

const HostPage = () => {
    const navigate = useNavigate()

    const [roomId, setRoomId] = useState("")
    const [hasRoomId, setHasRoomId]= useState(false)
    const {setIsHost, setIsJoin, isInRoom, setIsInRoom} = useGameContext()
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)

    const formInputs = [
        {type: 'text', name:'roomId', 
            title: 'Enter Room Id', value: roomId, 
            setValue: setRoomId, id: 1}
    ]

    const createRoom = async (e) => {
        e.preventDefault() 
        const socket = socketInService.socket
        if (!roomId || roomId.trim === "" || !socket) return;

        setIsCreatingRoom(true)

        const hosted = await socketGameService.hostGameRoom(socket, roomId)
        .then(() => {
            setIsCreatingRoom(false)
            setHasRoomId(true)
            setIsInRoom(true)
            setIsHost(true)
            setIsJoin(false)
            navigate("/game/multiplayer/face-off")
        })
        .catch((err) => {
            alert(err)
            setIsCreatingRoom(true)
            setHasRoomId(false)
            setIsInRoom(false)
            setIsHost(false)
            setIsJoin(false)
        })

        if (hosted) {
            console.log("hosted : ", hosted);   
        }else{
            console.log("hosted : ", hosted);   
        }
    }

    return (
        <div className="setIdAndHost">
            <CustomForm 
                formAttr={{
                    title : 'Set Room ID To Host Game',
                    placeHolder: "Enter Room Id",
                    action: createRoom,
                    isLoading: isCreatingRoom
                }}  
                formInputs={formInputs} 
                buttonAtrributes={isInRoom ? 
                    {   title: "Created.", 
                        disabled: isCreatingRoom} : 
                    {   title: isCreatingRoom ? "Creating..." : "Create", 
                        disabled: isCreatingRoom}
                    } 
            />
        </div>
    )
}

export default HostPage