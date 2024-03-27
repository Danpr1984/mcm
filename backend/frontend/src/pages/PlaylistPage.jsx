import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AudioContext } from "../context/AudioContext";
import { ColorContext } from "../context/ColorContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { generatePlaylistSlug } from "../components/audio/Playlist";
import ColorWheel from "../components/ColorWheel";
import AudioLayout from "../components/audio/AudioLayout";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PlaylistPage = () => {
  const { slug } = useParams();
  const { playlists } = useContext(AudioContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { setAssignTrack } = useContext(ColorContext);
  const { getCSRF } = useContext(AuthContext);
  const { setUserSongs } = useContext(AudioContext);

  useEffect(() => {
    if (!playlists) return;
    const selectedPlaylist = playlists.find(
      (playlist) => generatePlaylistSlug(playlist.name) === slug,
    );
    setSelectedPlaylist(selectedPlaylist);
    setAssignTrack(selectedPlaylist.tracks.items[0].track);
  }, [slug, playlists]);

  useEffect(() => {
    const fetchUserSongs = async () => {
      const csrf = await getCSRF();

      try {
        const response = await fetch(`${BASE_URL}/api/user_songs/`, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
          },
          credentials: "include",
        });

        const { user_songs } = await response.json();
        setUserSongs(user_songs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserSongs();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="my-3 flex flex-col items-center justify-center">
        <ColorWheel />
        <p className="my-2 font-medium uppercase text-gray-700">
          Select A Colour to assign to playing song
        </p>

        {selectedPlaylist ? (
          <AudioLayout tracks={selectedPlaylist.tracks.items} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
