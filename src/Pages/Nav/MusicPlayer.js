import React, { useEffect, useRef, useState } from "react";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); 

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked by browser");
        setIsPlaying(false); 
      }
    };
    playMusic();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? "Pause 🎵" : "Play ▶️"}
      </button>
      <audio ref={audioRef} src="/debussy.mp3" loop />
    </div>
  );
}

export default MusicPlayer;