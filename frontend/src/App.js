import React, { useState } from 'react';
import VideoPlayer from './Components/VideoPlayer';
import "./App.css"

const App = () => {
  const [video, setVideo] = useState(false)


  return (
    <div className='container'>

      <VideoPlayer />


    </div>
  );
};

export default App;
