import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "660bc9f960ec49bf9d1a5e944c24dfbd";
const redirectUri = "http://localhost:3000/";

const scopes = [
  "user-library-read",
  "playlist-read-private",
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "user-modify-playback-state",
  "playlist-modify-private",
  "playlist-modify-public",
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20",
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setClientToken = (token) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiClient;
