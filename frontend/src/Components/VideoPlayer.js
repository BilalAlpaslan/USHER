import React, { useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill, BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs"
import { RiFullscreenLine } from "react-icons/ri"


// const ws = new WebSocket("ws://164.92.250.16:8000/ws")
const VideoPlayer = () => {
    const videoRef = useRef()
    const titleRef = useRef()
    const controlBarRef = useRef()

    const [controller, setController] = useState({
        play: false,
        fullScreen: false,
        volume: false,
        volumeMute: false
    })

    const handlePlay = () => {
        if (!controller.play) {
            setTimeout(() => {
                titleRef.current.style.display = "none"
            }, 1000)
            videoRef.current.play()
            setController({ play: true })
        } else if (controller.play) {
            setController({ play: false })
            titleRef.current.style.display = "block"
            videoRef.current.pause()
        }
    }
    const fullScreen = () => {
        if (!controller.fullScreen) {
            videoRef.current.requestFullscreen()
            controller.fullScreen = true
        } else if (controller.fullScreen) {
            videoRef.current.exitFullscreen()
            controller.fullScreen = false
        }
    }
    const openVolume = () => {
        if (!controller.volume) {
            setController({ volume: true })
        } else if (controller.volume) {
            setController({ volume: false })
        }
    }
    const volumeRange = (e) => {

        videoRef.current.volume = e.target.value

    }
    return (
        <div className="videoplayer mt-5" id="myPlayer">
            <div className="ratio ratio-21x9 position-relative bg-dark">
                <video ref={videoRef} className="video" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4#t=9" />
                <div ref={titleRef} style={{
                    top: 0
                }} className="position-absolute text-light p-5">
                    <div className="title">
                        Video Title
                    </div>
                </div>
                <div ref={controlBarRef} style={{
                    "bottom": 0
                }} className="d-flex align-items-end position-absolute">
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
                            <div className="progress w-100">
                                <div className="progress-bar" />
                            </div>
                        </div>
                        <div onClick={fullScreen} className="btn text-light">
                            <RiFullscreenLine size={30} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VideoPlayer;
