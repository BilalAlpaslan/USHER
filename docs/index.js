
var ws = new WebSocket("ws://164.92.250.16:8000/ws");
let myVideo = document.getElementById("video");
var videoListener;
var second;

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
    console.log("changed =>", e.target.value);
    myVideo.src = fileURL;
}

function goToSecond() {
    ws.send(JSON.stringify({ "type": "goToSecond", "second": second.value }));
}

function setSecond(_second) {
    console.log("setSecond =>", _second);
    myVideo.currentTime = _second;
}

function hideNav() {
    document.getElementById("nav").style.display = "none";
}

function main() {
    
    ws.onopen = function () {
        console.log("Connected to server");
        myVideo = document.getElementById("video");
        second = document.getElementById("second");
        videoListener = document.getElementById("myVideo").addEventListener("change", chVideo);
    };
    ws.onclose = function () { alert("Connection closed") }

    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        if (data.data == "play")
            myVideo.play();
        else if (data.data == "pause")
            myVideo.pause();
        else if (data.data == "goToSecond")
            setSecond(data.second);
    }
}

main();