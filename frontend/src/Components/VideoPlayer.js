
import React, { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill, BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs"
import { RiFullscreenLine } from "react-icons/ri"


// const ws = new WebSocket("ws://164.92.250.16:8000/ws")
const VideoPlayer = () => {
    const videoRef = useRef()
    const titleRef = useRef()
    const controlBarRef = useRef()
    const currentTimeRef = useRef()

    const [controller, setController] = useState({
        play: false,
        fullScreen: false,
        volume: false,
        volumeMute: false,
    })
    const handleLoad = () => {
        setController({ ...controller })
    }
    const handlePlay = () => {
        if (!controller.play) {
            setTimeout(() => {
                titleRef.current.style.display = "none"
                controlBarRef.current.style.display = "none"
            }, 1000)
            videoRef.current.play()
            console.log(videoRef);
            setController({ ...controller, play: true })
        } else if (controller.play) {
            setController({ ...controller, play: false })
            titleRef.current.style.display = "block"
            videoRef.current.pause()
        }
    }
    const fullScreen = () => {
        videoRef.current.requestFullscreen()
    }
    const openVolume = () => {
        if (!controller.volume) {
            setController({ ...controller, volume: true })
            console.log(controller);
        } else if (controller.volume) {
            setController({ ...controller, volume: false })
        }
    }
    const handleCurrentTime = () => {
        currentTimeRef.current.innerHTML = `<span>
        ${Math.floor(videoRef.current.currentTime / 60)}
        </span> :
        <span>
        ${Math.floor(videoRef.current.currentTime % 60)}
        </span> `


    }
    const volumeRange = (e) => {

        videoRef.current.volume = e.target.value

    }
    return (
        <div className="videoplayer mt-5 d-flex" id="myPlayer">
            <div style={{
                flex: 1.5
            }} className="ratio ratio-21x9 position-relative bg-dark">
                <video onClick={handlePlay} onTimeUpdate={handleCurrentTime} ref={videoRef} onLoadedData={handleLoad} className="video" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4#t=9" />
                <div ref={titleRef} style={{
                    top: 0
                }} className="position-absolute text-light p-5">
                    <div className="title">
                        Video Title
                    </div>
                </div>
                <div ref={controlBarRef} style={{
                    "bottom": 0
                }} className="d-flex align-items-end position-absolute justify-content-between">
                    <div className='w-100 d-flex align-items-center'>
                        <div onClick={handlePlay} className="btn text-light">
                            {
                                controller.play ?
                                    <BsPauseFill size={30} />
                                    :
                                    <BsFillPlayFill size={30} />
                            }
                        </div>
                        <div className='d-flex align-items-center'>



                            <BsFillVolumeUpFill onClick={openVolume} color='white' size={25} className='d-flex justify-content-center' />

                            {
                                controller.volume &&
                                <input onChange={(e) => volumeRange(e)} type="range" min={0} max={1} step={0.1} className='mx-2' />
                            }

                        </div>
                        <div className="px-3 w-100" >
                            <div className="progress">
                                <div className="progress-bar" />
                            </div>
                        </div>
                        <div className='text-light d-flex'>
                            {
                                videoRef.current && (
                                    <React.Fragment>
                                        <span className='d-flex' ref={currentTimeRef}>00:00</span>
                                        /
                                        <span>
                                            {Math.floor(videoRef.current.duration / 60)}:{Math.floor(videoRef.current.duration % 60)}
                                        </span>
                                    </React.Fragment>
                                )
                            }
                        </div>
                        <div onClick={fullScreen} className="btn text-light">
                            <RiFullscreenLine size={30} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='ms-5' style={{
                flex: 0.5
            }}>
                Odalar
            </div>

        </div>
    );
};

export default VideoPlayer;
