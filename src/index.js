
let myVideo = document.getElementById("video");
var videoListener;

var ws = new WebSocket("ws://192.168.1.104:8001/ws");

ws.onopen = function () {
    console.log("Connected to server");
    myVideo = document.getElementById("video");
    videoListener = document.getElementById("myVideo").addEventListener("change", chVideo);
};
ws.onclose = function () { console.log("Connection closed") }

ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    console.log(data);
    if (data.data == "play")
        myVideo.play();
    else if (data.data == "pause")
        myVideo.pause();
}

function playPause() {
    if (myVideo.paused) {
        myVideo.play();
        ws.send(JSON.stringify({ "type": "play" }));
    } else {
        myVideo.pause();
        ws.send(JSON.stringify({ "type": "pause" }));
    }
}

function makeBig() {
    myVideo.width += 30;
}

function makeSmall() {
    myVideo.width -= 30;
}

function chVideo(e) {
    var file = this.files[0]
    var fileURL = URL.createObjectURL(file)
    console.log("changed =>",e.target.value);
    myVideo.src = fileURL;
}