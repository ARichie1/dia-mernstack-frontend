import socketInService from "../socketService"

class GameService {

    async createNewPlayer (id, socket, info) {
        return new Promise((rs, rj) => {
            socket.emit("createNewPlayer", {id, info})
            socket.on("playerCreated", (data) => {
                rs(data.playerInfo)
                alert("Player Created " + data.playerInfo.username)
            })
            socket.on("playerCreationError", ((err) => {
                // rj(err)
                // alert(err.error)
            }))
        })
    }

    async getAndCreatePlayer (currentPlayer) {
        console.log(currentPlayer);
        
        if (currentPlayer) {}
        const userGameInfo = {
            username: currentPlayer.username,
            image: currentPlayer.profileImage.value
        }
        const socket = socketInService.socket
        const createdPlayer = await this.createNewPlayer(
            currentPlayer.id, 
            socket, userGameInfo)

        if(createdPlayer){
            console.log("created");
        }
    }

    async hostGameRoom (socket, roomId) {
        return new Promise((rs, rj) => {
            socket.emit("hostGame", {roomId})
            socket.on("roomCreated", (data) => {
                rs(true)
                alert("Created " + data.roomId)
            })
            socket.on("roomCreationError", ((err) => {
                rj(err)
                alert(err.error)
            }))
        })
    }

    async joinGameRoom (socket, roomId) {
        return new Promise((rs, rj) => {
            socket.emit("joinGame", {roomId})
            socket.on("roomJoined", (data) => {
                rs(true)
                alert("Joined " + data.roomId)
            })
            socket.on("roomJoinError", ((err) => {
                rj(err)
                alert(err.error)
            }))
        })
    }

    async getHosts (socket) {
        return new Promise((rs, rj) => {
            socket.emit("getHosts")
            socket.on("sendingHosts", (data) => {
                rs(data.allAvailableHosts)
                console.log("Hosts : " + data.allAvailableHosts)
            })
            socket.on("sendingHostsError", ((err) => {
                rj(err)
                alert(err.error)
            }))
        })
    }

    async getOpponent (socket) {
       return new Promise((rs, rj) => {
        socket.emit("getOpponent")
        socket.on("sendingOpponentInfo", (data) => {
            rs(data.opponentInfo)
            console.log("Opponent : " + data.opponentInfo.username)
        })
        socket.on("sendingOpponentInfoError", ((err) => {
            rj(err)
            alert(err.error)
        }))
    })
    }

    async updateGame (socket, data) {
        return new Promise((rs, rj) => {
            socket.emit("updateGame", {data})
            socket.on("roomJoined", (data) => {
                rs(true)
                alert("Joined " + data.roomId)
            })
            socket.on("roomJoinError", ((err) => {
                rj(err)
                alert(err.error)
            }))
        })
    }
    async onGameUpdate (socket, data) {
        return new Promise((rs, rj) => {
            socket.on("onGameUpdate", (data) => {
                rs(true)
                alert("Joined " + data.roomId)
            })
            socket.on("roomJoinError", ((err) => {
                rj(err)
                alert(err.error)
            }))
        })
    }
}

const socketGameService = new GameService()

export default socketGameService 