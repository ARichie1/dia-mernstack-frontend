import socketInService from "../socketService"

class GameService {

    async createNewPlayer (id, socket, info) {
        return new Promise((rs, rj) => {
            socket.emit("createNewPlayer", {id, info})
            socket.on("playerCreated", (data) => {
                rs(data.playerInfo)
                console.log("Player Created " + data.playerInfo.username)
            })
            socket.on("playerAlreadyCreated", (data) => {
                rs(data.playerInfo)
                console.log("Player Already Created " + data.playerInfo.username)
            })
            socket.on("playerCreationError", ((err) => {
                // rj(err)
                console.log(err.error)
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
        const socket = await socketInService.socket
        const createdPlayer = await this.createNewPlayer(
            currentPlayer.id, 
            socket, userGameInfo)

        if(createdPlayer){
            console.log("created");
        }
    }

    async hostGameRoom (socket, roomId, gameProperties) {
        if (socket.connected) {
            return new Promise(async (rs, rj) => {
                console.log("sending room to be created ...");
                const sentRoomId = await socket.emit("hostGame", {roomId, gameProperties})
                
                if (sentRoomId) {
                    console.log("room id sent");
                    
                    socket.on("roomCreated", ({roomId, hostTurnOrder}) => {
                    
                        console.log("getting created room ...");
                        rs({roomId, hostTurnOrder})
                        console.log("Created " + roomId)
                    })
                }
                
                socket.on("roomCreationError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
    }

    async joinGameRoom (socket, roomId, gameProperties, order) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("joinGame", {roomId, gameProperties, order})
                socket.on("roomJoined", (data) => {
                    rs(true)
                    console.log("Joined " + data.roomId)
                })
                socket.on("roomJoinError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
        else{ return false}
    }

    async isPlayerInRoom (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("checkInRoom")
                socket.on("checkedInRoom", (data) => {
                    if (data.inRoom) {  
                        rs(data)
                        console.log("Player In A Room Already : " + data.roomId)
                    } else {
                        rs(false)
                        console.log("Player Can Host Or Join Room : " + data.roomId)
                    }
                })
                socket.on("checkedInRoomError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
    }

    async checkIfRoomFull (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("isRoomFull")
                socket.on("checkedIsRoomFull", (data) => {
                    if (data.roomFull) {  
                        rs(true)
                        console.log("Player Room Is Full.")
                    } else {
                        rs(false)
                        console.log("Player Room Aint't Full Yet ...")
                    }
                })
            })
        }
    }
    
    async fetchHosts (socket) {
        // socket.sendBuffer = [];
        return new Promise((rs, rj) => {
            console.log("sending fetch message...");
            socket.emit("getHosts")

            socket.sendBuffer = [];
        
            socket.on("sendingHosts", (data) => {
                let hostsData = data.allAvailableHosts
                rs(hostsData)
                console.log("Index-HostsData : ", hostsData);
                console.log("fetched.");
            })
            socket.on("sendingHostsError", ((err) => {
                // rj(err)
                console.log(err.error)
            }))
        })
    }

    async getHosts () {
        let hostsData
        
        const socket = await socketInService.socket
        if (!socket) return;

        socket.sendBuffer = [];
        await this.fetchHosts(socket)
        .then((data) => {
            hostsData = data
        })
        socket.sendBuffer = [];
        return hostsData
    }

    async getOpponent (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("getOpponent")
                socket.on("sendingOpponentInfo", (data) => {
                    rs(data.opponentInfo)
                    console.log("Opponent : " + data.opponentInfo.username)
                })
                socket.on("sendingOpponentInfoError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
    }
    
    // Host Sends Game Property To Room
    async saveGameProperties (socket, gameProperties, isReady) {
        if (socket.connected) {
            socket.emit("saveGameProperties", {gameProperties, isReady})
        }
    }

    // Joiner Gets The Game Property The Host Saved
    async recieveGameProperties (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("requestGamePropertiesFromHost")
                
                socket.on("sendingGameProperties", ({gameProperties, hostIsReady}) => {
                    rs({gameProperties, hostIsReady})
                    console.log("hostIsReady : ", hostIsReady)
                })
            })
        }
    }

    // Save Secret Code Selected
    async saveCode (socket, codeArray) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("saveCode", {code: codeArray})
                
                socket.on("codeSaved", ({saved}) => {
                    rs(saved)
                    console.log("code saved : ", saved)
                })
            })
        }
    }
    
    // Let Room Know Player Is Ready To Play
    async sendReadyToPlay (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("readyToPlay", {ready: true})
                
                socket.on("sentReadyToPlay", ({sent}) => {
                    rs(sent)
                    console.log("ready to play : ", sent)
                })
            })
        }
    }

    // Get The Opponent R2PS
    async recieveOpponentReadyToPlayState (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("checkIfOpponentReadyToPlay")
                
                socket.on("opponentReadyToPlayState", ({opponentIsReady}) => {
                    rs({opponentIsReady})
                    console.log("opponentIsReadyToPlay : ", opponentIsReady)
                })
            })
        }
    }

    
    // Send RealTime Code Button Click To Server
    // So Both Player Can View
    async sendActivePredictionToServer (socket, selection) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("sendingActivePrediction", {selection})
                
                socket.on("sentActivePrediction", ({sent}) => {
                    rs(sent)
                    // console.log("Sent My ActivePrediction : ", sent)
                })
            })
        }
    }

    // Get RealTime Code Button From Opponent
    async recieveOpponentActivePrediction (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                // socket.on("sendingOpponentActivePrediction", ({selection}) => {
                socket.on("sendingMyActivePrediction", ({selection}) => {
                    rs(selection)
                    // console.log("recieved Opp ActivePrediction : ", selection)
                })
            })
        }
    }

    // Send Current Prediction Code Button Click To Server
    async sendCurrentPredictionToServer (socket, selection) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                console.log("sending cp to server...");
                
                socket.emit("sendingCurrentPrediction", {selection})
                
                socket.on("sentCurrentPrediction", ({results}) => {
                    rs(results)
                    console.log("Sent My CurrentPrediction : ", results)
                })
            })
        }
    }
    
    // Get Opponent's Current Prediction (code and result)
    async recieveOpponentCurrentPrediction (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.on("sendingMyCurrentPrediction", ({selection, results}) => {
                    rs({selection, results})
                    console.log("recieved Opp CurrentPrediction : ", {selection, results})
                })
            })
        }
    }

    // Send Predictions Code Button Click To Server
    async sendPredictionsToServer (socket, predictions) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("sendingPredictions", {predictions})
                
                socket.on("sentPredictions", ({result}) => {
                    rs(result)
                    console.log("Sent My Pedictions : ", result)
                })
            })
        }
    }

    
    // Get Opponent's Predictions (code and result)
    async recieveOpponentPredictions (socket) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.on("sendingOpponentPredictions", ({selection}) => {
                    rs(selection)
                    console.log("recieved Opp Predictions: ", selection)
                })
            })
        }
    }

    async recieveJoinerInfo (socket) {
        if (socket.connected) {
            // return new Promise((rs, rj) => {
                
                socket.emit("sendJoinerInfoToHost")
                console.log("Prompting Joiner ... ");

                await socket.on("sendingHostOpponent", ({info}) => {
                    // rs(info)
                    console.log("Joiner : ", info);
                })
            // })  
        }
    }

    async updateGame (socket, data) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.emit("updateGame", {data})
                socket.on("roomJoined", (data) => {
                    rs(true)
                    console.log("Joined " + data.roomId)
                })
                socket.on("roomJoinError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
    }

    async onGameUpdate (socket, data) {
        if (socket.connected) {
            return new Promise((rs, rj) => {
                socket.on("onGameUpdate", (data) => {
                    rs(true)
                    console.log("Joined " + data.roomId)
                })
                socket.on("roomJoinError", ((err) => {
                    rj(err)
                    console.log(err.error)
                }))
            })
        }
    }
}

const socketGameService = new GameService()

export default socketGameService 