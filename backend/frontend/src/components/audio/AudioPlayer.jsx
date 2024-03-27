import React, { useRef, useEffect } from "react";

function AudioPlayer({ track, autoPlay }) {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.src = track.preview_url;
    if (autoPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [track, autoPlay]);

  return <audio className="audio-player" ref={audioRef} controls />;
}

export default AudioPlayer;
