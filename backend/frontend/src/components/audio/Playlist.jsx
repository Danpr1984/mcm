import { Link } from "react-router-dom";

export function generatePlaylistSlug(playlistName) {
  return playlistName
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\w-]+/g, "");
}

const Playlist = ({ playlist }) => {
  const slug = generatePlaylistSlug(playlist.name);

  return (
    <Link
      to={`/playlist/${slug}`}
      className="mx-auto my-2 w-fit transition duration-300 ease-in-out hover:scale-105 focus:scale-105"
    >
      <h2 className="font-semibold">{playlist.name}</h2>
      <img
        src={playlist.images[0].url}
        className="aspect-square h-60 rounded-lg shadow-lg"
        alt="Playlist-Art"
      />
    </Link>
  );
};

export default Playlist;
