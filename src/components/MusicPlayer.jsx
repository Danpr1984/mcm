import React from 'react';

function playRandomSong(audioFiles) {
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const selectedSong = audioFiles[randomIndex];
  const audio = new Audio(selectedSong);
  audio.play();
}

const MusicPlayer = () => {
  // Define the audio files for each color (replace with your actual file paths)
  const colorSongs = {
    yellow: ['src/music/happy/Feeling_Happy_FesliyanStudios.mp3', 'src/music/happy/Happy_Dreams_David_Fesliyan.mp3', 'src/music/happy/Happy_Feet_www.com.mp3', 'src/music/happy/Smilin_And_Vibin_.mp3'],
    grey: ['src/music/sad/Emotional_Regret_.mp3', 'src/music/sad/Goodbye,_My_Friend_.mp3', 'src/music/sad/Lost_Souls.com.mp3', 'src/music/sad/Please_Dont_Cry_mp3.mp3'],
    // Define songs for other colors as needed
  };

  return (
    <div>
      {Object.keys(colorSongs).map((color) => (
        <button
          key={color}
          onClick={() => playRandomSong(colorSongs[color])}
        >
          Play {color} Song
        </button>
      ))}
    </div>
  );
};

export default MusicPlayer;
