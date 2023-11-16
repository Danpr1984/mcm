import React, { useState, useEffect, createContext } from "react";
import './Colors.css';
import { colorSongs } from './MusicPlayer.jsx';
import Library, { playPlaylist } from './Library.jsx';
import apiClient from './spotify.js';

export const colors = [
  {id: 1, name: 'yellow'},
  {id: 2, name: 'green'},
  {id: 3, name: 'red'},
  {id: 4, name: 'blue'},
  {id: 5, name: 'pink'},
  {id: 6, name: 'purple'},
  {id: 7, name: 'brown'},
  {id: 8, name: 'orange'},
  {id: 9, name: 'grey'},
  {id: 10, name: 'aqua'},
  {id: 11, name: 'white'}
];

const ColorWheel = () => {
 
  const segmentAngle = (2 * Math.PI) / colors.length;

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [trackUri, setTrackUri] = useState(null);

  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me")
      .then((response) => {
        setImage(response.data.images[0].url);
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
        // Set a default image in case of error
        setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU");
      });
  }, []);
  
  const playRandomSong = (audioFiles) => {
    if (!Array.isArray(audioFiles) || audioFiles.length === 0) {
      console.error('Invalid audioFiles array:', audioFiles);
      return;
    }

    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const selectedSong = audioFiles[randomIndex];

    if (!selectedSong) {
      console.error('No selected song found.');
      return;
    }

    const audio = new Audio(selectedSong.url);
    audio.play();
  };

  const handleColorClick = (color) => {
    const audioFiles = colorSongs[color];
    playRandomSong(audioFiles);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedColor(null);
  };

  const handleAssignColorClick = (song) => {
    setSelectedColor(song);
  };

  const handleColorAssign = (color) => {
    if (selectedColor) {
      // Assign the selected color to the selected song
      console.log(`Assigning color ${color} to song ${selectedColor.name}`);
      setSelectedColor(null);
    }
  };


  return (
    <div className="app-container">
      <div className="sidebar-container">
        <img src={image} className="profile-img" alt="profile" />
        <Library/>
      </div>
      <div className="color-wheel-container {`color-wheel-container ${isPlaying ? 'spin' : ''}`}">
        <div className="center-container">
          <svg width="800" height="800">
            <circle cx="250" cy="250" r="230" stroke="black" strokeWidth="2" fill="none" />
            {colors.map((color, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;
              const x1 = 250 + 230 * Math.cos(startAngle);
              const y1 = 250 + 230 * Math.sin(startAngle);
              const x2 = 250 + 230 * Math.cos(endAngle);
              const y2 = 250 + 230 * Math.sin(endAngle);

              return (
                <polygon
                  key={color.id}
                  points={`250,250 ${x1},${y1} ${x2},${y2}`}
                  fill={color.name}
                  onClick={() => handleColorClick(color)}
                />
              );
            })}
          </svg>
        </div>
      </div>
      
    </div>
  );
};

export default ColorWheel;