const io = require("socket.io-client");

class SocketService {

    constructor () {
        this.socket = null
    }

    connect (url) {
        console.log(url);
        return new Promise((rs, rj) => {
            // this.socket = io('http://127.0.0.1:4000')
            this.socket = io('dia-mernstack-backend.vercel.app')
            // this.socket = io(
            //     'http://127.0.0.1:4000',
            //     {transports: ["websockets"]})

            if(!this.socket){
                return rj()
            }

            this.socket.on("connect", () => {
                this.socket.sendBuffer = [];
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