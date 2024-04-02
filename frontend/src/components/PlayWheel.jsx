import { useContext, useState } from "react";
import { AudioContext } from "../context/AudioContext";
import { randomItem } from "../helpers/functions";
import AudioPlayer from "./audio/AudioPlayer";

const PlayWheel = () => {
  const { userSongs } = useContext(AudioContext);
  const [randomSong, setRandomSong] = useState(null);
  const [randomColor, setRandomColor] = useState(null);

  const handleColorAssign = async (color) => {
    const filteredSongs = groupedSongs[color];
    setRandomSong(randomItem(filteredSongs));
    setRandomColor(color);
  };

  const groupedSongs = userSongs.reduce((acc, item) => {
    const { song, color } = item;

    if (acc[color]) {
      acc[color].push(song);
    } else {
      acc[color] = [song];
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg viewBox="0 0 64 64" className="pie">
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer hover:brightness-125 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            stroke: "orange",
            strokeDashoffset: -1,
          }}
          onClick={() => handleColorAssign("orange")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer hover:brightness-125 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            stroke: "skyblue",
            strokeDashoffset: 12.5,
          }}
          onClick={() => handleColorAssign("skyblue")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer hover:brightness-125 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            stroke: "gray",
            strokeDashoffset: 25,
          }}
          onClick={() => handleColorAssign("gray")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer stroke-black hover:stroke-black/50 focus:stroke-black/50"
          style={{
            strokeDasharray: "100 100",
            strokeDashoffset: 37.5,
          }}
          onClick={() => handleColorAssign("black")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer stroke-yellow-300 hover:stroke-yellow-200 hover:brightness-125 focus:stroke-yellow-200 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            strokeDashoffset: 50,
          }}
          onClick={() => handleColorAssign("yellow")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer stroke-blue-700 hover:stroke-blue-600 hover:brightness-125 focus:stroke-blue-600 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            strokeDashoffset: 62.5,
          }}
          onClick={() => handleColorAssign("blue")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer stroke-red-600 hover:stroke-red-500 hover:brightness-125 focus:stroke-red-500 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            strokeDashoffset: 75,
          }}
          onClick={() => handleColorAssign("red")}
        ></circle>
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          className="cursor-pointer hover:brightness-125 focus:brightness-125"
          style={{
            strokeDasharray: "100 100",
            stroke: "green",
            strokeDashoffset: 87.5,
          }}
          onClick={() => handleColorAssign("green")}
        ></circle>
      </svg>

      {randomSong && (
        <div className="text-center">
          <div className="jumping mx-auto my-5 flex items-center justify-center gap-1">
            <div className={`${randomColor} h-4 w-4 rounded-full`}></div>
            <div className={`${randomColor} h-4 w-4 rounded-full`}></div>
            <div className={`${randomColor} h-4 w-4 rounded-full`}></div>
            <div className={`${randomColor} h-4 w-4 rounded-full`}></div>
            <div className={`${randomColor} h-4 w-4 rounded-full`}></div>
          </div>
          <div className="flex">
            <img
              className="h-10 w-10 rounded-lg object-cover"
              alt="track album cover"
              src={randomSong.image}
            />
            <div className="flex w-full flex-col px-2">
              <span className="pt-1 text-sm font-semibold capitalize text-red-500">
                {randomSong.name || "No name"}
              </span>
              <span className="text-xs font-medium uppercase text-gray-500 ">
                -{randomSong.artist}
              </span>
            </div>
            <AudioPlayer track={randomSong} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayWheel;
