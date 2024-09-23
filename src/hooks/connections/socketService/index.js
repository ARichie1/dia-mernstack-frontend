const io = require("socket.io-client");

class SocketService {

    constructor () {
        this.socket = null
    }

    connect (url) {
        return new Promise((rs, rj) => {
            this.socket = io(url)

            if(!this.socket){
                return rj()
            }

            this.socket.on("connect", () => {
                rs(this.socket)
                console.log("connected");
                
            })

            this.socket.on("connect_error", (err) => {
                console.log("Connection Error", err)
                rj(err)
            })
        })
    }
}

const socketInService = new SocketService()

export default socketInService