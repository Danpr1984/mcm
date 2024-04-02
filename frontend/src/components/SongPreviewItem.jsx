import { useContext } from "react";
import { FaQuestion } from "react-icons/fa";
import { ColorContext } from "../context/ColorContext";
import { findObjectById } from "../helpers/functions";
import { AudioContext } from "../context/AudioContext";

const SongPreviewItem = ({ track }) => {
  const { setAssignTrack } = useContext(ColorContext);
  const { userSongs } = useContext(AudioContext);

  const alreadyAssigned = findObjectById(userSongs, track.id);

  return (
    <button
      className="flex cursor-pointer border-b px-2 py-3 hover:shadow-md"
      onClick={() => setAssignTrack(track)}
    >
      <img
        className="h-10 w-10 rounded-lg object-cover"
        alt="track album cover"
        src={track?.album?.images[0]?.url}
      />
      <div className="flex w-full flex-col px-2">
        <span className="pt-1 text-sm font-semibold capitalize text-red-500">
          {track.name || "No name"}
        </span>
        <span className="text-xs font-medium uppercase text-gray-500 ">
          -{track.artists[0].name}
        </span>
      </div>
      {alreadyAssigned ? (
        <div
          className={`${alreadyAssigned.color} flex aspect-square h-12 items-center justify-center rounded-full border border-slate-950 bg-opacity-80 bg-clip-padding backdrop-blur-md backdrop-filter`}
        ></div>
      ) : (
        <div className="flex aspect-square h-12 items-center justify-center rounded-full border border-slate-950 bg-slate-200 bg-opacity-80 bg-clip-padding backdrop-blur-md backdrop-filter">
          <FaQuestion />
        </div>
      )}
    </button>
  );
};

export default SongPreviewItem;
