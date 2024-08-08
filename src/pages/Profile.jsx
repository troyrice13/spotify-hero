import React, { useState, useEffect } from "react";
import './Profile.css';
import { getUserData, getRecentlyPlayedTracks } from "../services/spotify";


export default function Profile() {
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const accessToken = localStorage.getItem('spotify_access_token');
    
            if (!accessToken) {
              throw new Error('No access token found');
            }
    
            const userData = await getUserData();
            setUser(userData.data);
    
            const recentlyPlayed = await getRecentlyPlayedTracks();
            setTracks(recentlyPlayed.data.items);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

        return (
            <div className="profile-container">
                {user ? (
                    <>
                        <h1 className="profile-title">Welcome, {user.display_name}!</h1>
                        <h2 className="profile-subheader">Recently Played Tracks:</h2>
                        <ul>
                            {tracks.map(track => (
                                <li className="profile-track-items" key={track.track.id}>
                                    {track.track.name} by {track.track.artists[0].name}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
}