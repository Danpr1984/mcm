import React from "react";
import { loginEndpoint } from "../components/spotify";

export default function SpotifyLogin() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
        className="h-28"
      />
      <a href={loginEndpoint}>
        <div className="m-3 rounded-2xl bg-gray-100 p-3 shadow-xl hover:bg-gray-300 focus:bg-gray-300 ">
          LOG IN
        </div>
      </a>
    </div>
  );
}
