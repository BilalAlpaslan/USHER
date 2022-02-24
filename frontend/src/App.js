import { useEffect } from 'react';
import VideoPlayer from 'react-video-js-player';
import { init, wsConnect } from './WebSocket/socket-client';


function App() {
  useEffect(wsConnect, []);

  return (
    <div className='h-screen bg-slate-800 flex flex-col items-center'>
      <div className='text-2xl my-14 w-full text-white text-center'>Usher Media player</div>
      <div className='flex'>
        <VideoPlayer
          controls={true}
          src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
          width="720"
          height="420"
        />
        <div className='text-white mx-5'>
          odadakiler
        </div>
      </div>
    </div>
  );
}

export default App;
