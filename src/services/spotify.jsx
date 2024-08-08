import axios from "axios";

const getAccessToken = () => {
    return localStorage.getItem('spotify_access_token')
};

export const getUserData = () => {
    const token = getAccessToken();
    return axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getRecentlyPlayedTracks = () => {
    const token = getAccessToken();
    return axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}