import { useEffect, useRef, useState } from 'react'
import VideoPlayer from 'react-video-js-player';
import { roomEntity } from './bloc/room';
import { wsConnect } from './WebSocket/socket-client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const Player = () => {
  const [isReady, setReady] = useState(false)
  const [username, setUsername] = useState()
  const videoRef = useRef()
  var rooms = roomEntity.use()


  const handleReady = () => {
    if (username) setReady(true)
  }


  useEffect(() => {
    if (isReady) {
      if (username === null || username === undefined || username === "") setUsername("Guest")
      wsConnect(videoRef, username)
    }
  }, [isReady, username]);

  return (
    <div className='h-screen bg-slate-800 flex flex-col items-center'>
      <div className='text-2xl my-14 w-full text-white text-center'>Usher Media player</div>
      {
        isReady ?
          (
            <div className='flex'>
              <VideoPlayer
                ref={videoRef}
                controls={true}
                src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                width="720"
                height="420"
              />
              <div className='text-white mx-5'>
                odadakiler
                {rooms ? rooms.map((person, index) => <p key={index}>{person}</p>) : null}
              </div>
            </div>
          )
          : (
            <div className='flex flex-col items-center'>
              <input
                className='w-full my-4' type='text' placeholder='Username'
                onChange={(e) => setUsername(e.target.value)} />
              <button className='w-full my-4 bg-blue-500 text-white' onClick={handleReady}>Connect</button>
            </div>
          )
      }
    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
