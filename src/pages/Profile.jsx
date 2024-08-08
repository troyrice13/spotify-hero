import React, { useState, useEffect } from "react";
import './Profile.css';
import { getUserData, getRecentlyPlayedTracks } from "../services/spotify";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [player, setPlayer] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('spotify_access_token');
    
                if (!accessToken) {
                    throw new Error('No access token found');
                }
    
                const userData = await getUserData();
                console.log("User Data:", userData.data);
                setUser(userData.data);
    
                const recentlyPlayed = await getRecentlyPlayedTracks();
    
                // Filter out duplicate tracks based on track ID
                const uniqueTracks = [];
                const trackIds = new Set();
    
                recentlyPlayed.data.items.forEach((item) => {
                    if (!trackIds.has(item.track.id)) {
                        uniqueTracks.push(item);
                        trackIds.add(item.track.id);
                    }
                });
    
                setTracks(uniqueTracks);
    
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const player = new window.Spotify.Player({
                        name: 'Spotify Hero Web Player',
                        getOAuthToken: cb => { cb(accessToken); },
                        volume: 0.5
                    });
    
                    // Error handling
                    player.addListener('initialization_error', ({ message }) => { console.error(message); });
                    player.addListener('authentication_error', ({ message }) => { console.error(message); });
                    player.addListener('account_error', ({ message }) => { console.error(message); });
                    player.addListener('playback_error', ({ message }) => { console.error(message); });
    
                    // Playback status updates
                    player.addListener('player_state_changed', state => {
                        if (state) {
                            setCurrentTrack(state.track_window.current_track);
                        }
                    });
    
                    // Ready
                    player.addListener('ready', ({ device_id }) => {
                        console.log('Ready with Device ID', device_id);
                        setPlayer(player);
    
                        // Transfer playback to the newly connected device
                        player._options.getOAuthToken(access_token => {
                            fetch(`https://api.spotify.com/v1/me/player`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    device_ids: [device_id],
                                    play: false,
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${access_token}`,
                                },
                            });
                        });
                    });
    
                    // Connect to the player!
                    player.connect().then(success => {
                        if (success) {
                            console.log('The Web Playback SDK successfully connected to Spotify!');
                        } else {
                            console.error('The Web Playback SDK failed to connect.');
                        }
                    });
                };
    
                const script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                document.body.appendChild(script);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const playTrack = async (trackUri) => {
        if (player) {
            const state = await player.getCurrentState();
    
            if (!state) {
                console.error('No active Spotify device found. Please start playback from the Spotify app or ensure the Web Playback SDK is connected.');
                return;
            }
    
            console.log('Attempting to play track:', trackUri); // Log the track URI
            player._options.getOAuthToken(access_token => {
                fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [trackUri] }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error playing track: ${response.statusText}`);
                    }
                })
                .catch(error => console.error('Error playing track:', error));
            });
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h1 className="profile-title">Welcome, {user.display_name}!</h1>
                    <h2 className="profile-subheader">Recently Played Tracks:</h2>
                    <ul className="profile-track-list">
                        {tracks.map(track => (
                            <li className="profile-track-items" key={track.track.id} onClick={() => playTrack(track.track.uri)}>
                                {track.track.name} by {track.track.artists[0].name}
                            </li>
                        ))}
                    </ul>
                    {currentTrack && (
                        <div>
                            <h3 className="current-track">Now Playing: {currentTrack.name} by {currentTrack.artists[0].name}</h3>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
