var ws
// var myVideo
// var videoListener;
// var second;

export const wsConnect = (videoRef, username = "Guest") => {
    // myVideo = videoRef

    ws = new WebSocket("ws://192.168.1.104:8001/ws?client=" + username);


    ws.onopen = () => {
        console.log("Connected to server");
    }

    ws.onclose = function () { alert("Connection closed") }

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        if (data.data === "play")
            console.log("play")
            // myVideo.play();
        else if (data.data === "pause")
            console.log("pause")
            // myVideo.pause();
        else if (data.data === "goToSecond")
            console.log("go to second")
            // setSecond(data.second);
        else if (data.data === "room")
            console.log(data.persons)
    }
}
