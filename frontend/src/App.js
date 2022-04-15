import { useEffect, useRef } from 'react';
import VideoPlayer from 'react-video-js-player';
import { roomEntity } from './bloc/room';
import { wsConnect } from './WebSocket/socket-client';


function App() {

  var rooms = roomEntity.use()
  const videoRef = useRef()

  useEffect(() => { 
    wsConnect(videoRef)
  }, []);

  return (
    <div className='h-screen bg-slate-800 flex flex-col items-center'>
      <div className='text-2xl my-14 w-full text-white text-center'>Usher Media player</div>
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
          {rooms ? rooms.map((person, index)=> <p key={index}>{person}</p> ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
