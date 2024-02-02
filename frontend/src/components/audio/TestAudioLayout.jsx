import { FaQuestion } from "react-icons/fa";
import SongPreviewItem from "../SongPreviewItem";
import { useState } from "react";

const TestAudioLayout = ({ tracks }) => {
  const [track, setTrack] = useState(tracks[0].track);

  return (
    <section className="container">
      <div>
        <div className="flex border-b p-5">
          <img
            className="h-20 w-20 object-cover"
            alt="User avatar"
            src={track?.album?.images[0].url}
          />
          <div className="flex w-full flex-col px-2">
            <span className="text-xs font-medium uppercase text-gray-700">
              Now playing
            </span>
            <span className="pt-1 text-sm font-semibold capitalize text-red-500">
              {track.name}
            </span>
            <span className="text-xs font-medium uppercase text-gray-500 ">
              -{track.artists[0].name}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="whitespace-nowrap text-sm font-semibold capitalize text-red-500">
              Assigned Colour
            </p>
            <div className="flex aspect-square h-12 items-center justify-center rounded-full border border-slate-950 bg-slate-200 bg-opacity-80 bg-clip-padding backdrop-blur-md backdrop-filter">
              <FaQuestion />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center p-5 sm:flex-row">
          <div className="flex items-center">
            <div className="flex space-x-3 p-2">
              <button className="focus:outline-none">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full pl-0.5 ring-1 ring-red-400 focus:outline-none">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <button className="focus:outline-none">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="relative ml-2 w-full sm:w-1/2 md:w-7/12 lg:w-4/6">
            <div className="h-2 w-full rounded-lg bg-red-300"></div>
            <div className="absolute top-0 h-2 w-1/2 rounded-lg bg-red-500"></div>
          </div>
          <div className="flex w-full justify-end pt-1 sm:w-auto sm:pt-0">
            <span className="pl-2 text-xs font-medium uppercase text-gray-700">
              02:00/04:00
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col p-5">
        <div class="mb-2 flex items-center justify-between border-b pb-1">
          <span class=" text-base font-semibold uppercase text-gray-700">
            {" "}
            play list
          </span>
          <img
            class="w-4 cursor-pointer"
            src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"
          />
        </div>

        {tracks
          .filter((item) => item.track.id !== track.id)
          .map((track, index) => (
            <SongPreviewItem
              track={track.track}
              key={index}
              setTrack={setTrack}
            />
          ))}
      </div>
    </section>
  );
};

export default TestAudioLayout;