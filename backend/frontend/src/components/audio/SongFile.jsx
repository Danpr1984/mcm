import { useContext, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import SongPreviewItem from "../SongPreviewItem";
import { FaQuestion } from "react-icons/fa";
import TestAudioLayout from "./TestAudioLayout";

const SongFile = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <p>{track.track.name || "No name"}</p>
      <div className="flex gap-2">
        <TestAudioLayout />

        <AudioPlayer
          track={track.track}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying((prev) => !prev)}
        />
        <div className="flex aspect-square h-12 items-center justify-center rounded-full border border-slate-950 bg-slate-200 bg-opacity-80 bg-clip-padding backdrop-blur-md backdrop-filter">
          <FaQuestion />
        </div>
      </div>
    </div>
  );
};

export default SongFile;
