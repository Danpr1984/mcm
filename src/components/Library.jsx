import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import APIKit from "./spotify.js";
import { useLocation } from "react-router-dom";
import { colors } from "./ColorWheel.jsx";
import AudioPlayer from "./audioPlayer.jsx";
import UserContext from "../UserContext.jsx";

function Library() {
  const [openColorPanels, setOpenColorPanels] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const [songColors, setSongColors] = useState({});
  const [userSavedSongs, setUserSavedSongs] = useState();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    fetchUserTracks();
  }, []);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  const fetchPlaylists = async () => {
    try {
      const response = await APIKit.get("me/playlists");
      const playlists = response.data.items;
      const promises = playlists.map((playlist) =>
        APIKit.get(playlist.tracks.href).then((response) => {
          playlist.tracks.items = response.data.items;
          return playlist;
        })
      );
      const playlistsWithTracks = await Promise.all(promises);
      setPlaylists(playlistsWithTracks);
    } catch (error) {
      console.error("Error fetching playlists or tracks:", error);
    }
  };

  const fetchUserTracks = async (playlistId) => {
    try {
      const response = await fetch("http://localhost:8000/api/songs");

      const { user_songs } = await response.json();

      setUserSavedSongs(user_songs);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylist((prevPlaylistId) =>
      prevPlaylistId === playlistId ? null : playlistId
    );
  };

  const handleAssignColorClick = (event, track) => {
    event.stopPropagation();
    setSelectedTrack(track); // Set the selected track
  };

  const handleColorAssign = async (color) => {
    if (!selectedTrack) return;

    // USER IS NULL DUE TO CONTEXT ISSUES
    const data = {
      color: color,
      track: selectedTrack,
    };

    const response = await fetch(
      "http://localhost:8000/api/assign_color_to_song/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };

  const handlePlaySong = (track, index) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  console.log(userSavedSongs);

  return (
    <>
      <h1>Saved to DB</h1>
      {userSavedSongs &&
        userSavedSongs.map((song, index) => {
          return (
            <div key={index}>
              <div style={{ background: song.color.hex_code, padding: "1rem" }}>
                <h2 style={{ color: "white" }}>{song.color.name}</h2>
              </div>
              <div>{song.user.email}</div>
              <AudioPlayer
                track={song.song}
                isPlaying={isPlaying && currentTrack === song.song.id}
                onPlay={() => handlePlaySong(song.song, index)}
              />
            </div>
          );
        })}

      <div className="sidebar-container">
        <div className="library-body">
          {playlists?.map((playlist) => (
            <div
              className={`playlist-card ${
                selectedPlaylist === playlist.id ? "active" : ""
              }`}
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              {playlist.images && playlist.images[0] && (
                <img
                  src={playlist.images[0].url}
                  className="playlist-image"
                  alt="Playlist-Art"
                />
              )}
              <div className="playlist-songs">
                {selectedPlaylist === playlist.id &&
                  playlist.tracks.items &&
                  playlist.tracks.items.map((track, index) => (
                    <div key={index}>
                      <p>{track.track.name || "No name"}</p>
                      <button
                        onClick={(event) =>
                          handleAssignColorClick(event, track)
                        }
                      >
                        Assign Color
                      </button>
                      <div className="color-assignment-panel">
                        {colors.map((color) => (
                          <div
                            key={color.id}
                            className="color-square"
                            style={{ backgroundColor: color.name }}
                            onClick={() => handleColorAssign(color)}
                          />
                        ))}
                      </div>
                      <AudioPlayer
                        track={track.track}
                        isPlaying={isPlaying && currentTrack === track.track.id}
                        onPlay={() => handlePlaySong(track.track, index)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Library;

// MULTIPLE PLAYLIST CODE
