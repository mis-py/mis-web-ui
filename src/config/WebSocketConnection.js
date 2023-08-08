import { baseUrl } from "./variables";

let webSocket;

export function initiateWebSocket() {
    const token = localStorage.getItem("token");

    if (token && webSocket === undefined) {
        webSocket = new WebSocket(baseUrl.replace("http", "ws") + `/ws/?token=${token}`);
    }

    return webSocket;
}

export default webSocket;