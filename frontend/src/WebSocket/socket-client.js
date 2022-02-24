const ws = new WebSocket("ws://164.92.250.16:8000/ws");


export const wsConnect = () => {
    ws.onopen = () => {
        console.log("Connected to server");
        ws.send("Hello Server");
    }
}