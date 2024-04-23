//import { baseUrl } from "../config/variables";

// let webSocket;

class Socket {

    constructor() {
        this.socket = null;
    }
    
    connect() {
        let token = localStorage.getItem('token') ?? null;
        if (!token){
            console.error("WebSocket: No token provided!");
        }
        if (!this.socket) {
            //this.socket = new WebSocket(baseUrl.replace("http", "wss") + `/ws/?token=${token}`);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close()
            this.socket = null;
        }
    }

    send(message) {
        if (this.socket) {
            this.socket.send(JSON.stringify(message))
        }
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.addEventListener(eventName, callback)
        }
    }
}

export default Socket;
