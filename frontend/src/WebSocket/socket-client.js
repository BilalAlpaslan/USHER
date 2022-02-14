import io from "socket.io-client"

let socket;

export const init = () => {
    console.log("server loading...");
    socket = io("http://164.92.250.16:8008", {
        transports: ['websocket']
    });

    socket.on("connect", () => {
        console.log("server connected");
    });
}