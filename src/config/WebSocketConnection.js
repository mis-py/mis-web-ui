
import {baseUrl} from "./variables";
const token = localStorage.getItem("token");

const webSocket = new WebSocket(baseUrl.replace("http", "ws") + `/ws/?token=${token}`)

export default webSocket;
