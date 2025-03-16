import React, { useRef, useState, useEffect } from "react";

function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef1 = useRef(new Audio("/debussy.mp3")); // First song
  const audioRef2 = useRef(new Audio("/sakamoto.mp3")); // Second song
  const [currentTrack, setCurrentTrack] = useState(1); // Track indicator

  useEffect(() => {
    const playMusic = async () => {
      if (isPlaying) {
        try {
          await audioRef1.current.play();
        } catch (err) {
          console.log("Autoplay blocked. User interaction required.");
        }
      }
    };

    playMusic();

    // Event listener to switch songs
    audioRef1.current.addEventListener("ended", () => {
      setCurrentTrack(2);
      audioRef2.current.play();
    });

    audioRef2.current.addEventListener("ended", () => {
      setCurrentTrack(1);
      audioRef1.current.play();
    });

    return () => {
      audioRef1.current.removeEventListener("ended", () => {});
      audioRef2.current.removeEventListener("ended", () => {});
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef1.current.pause();
      audioRef2.current.pause();
    } else {
      currentTrack === 1 ? audioRef1.current.play() : audioRef2.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return <button onClick={togglePlay} style={{ display: "none" }}></button>; // Hidden control
}

export default MusicPlayer;