import { baseUrl } from "./variables";

let webSocket;

export function initiateWebSocket() {
    const token = localStorage.getItem("token");

    if (token !== null && webSocket === undefined) {
        webSocket = new WebSocket(baseUrl.replace("http", "ws") + `/ws/?token=${token}`);

        webSocket.onerror = (e) => {
            console.log(e);
        };
    }

    return webSocket;
}
