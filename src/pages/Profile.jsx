import React, { useState, useEffect } from "react";
import './Profile.css';
import { getUserData, getRecentlyPlayedTracks } from "../services/spotify";


export default function Profile() {
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = getUserData();
                setUser(userData.data)

                const recentlyPlayed = getRecentlyPlayedTracks();
                setTracks((await recentlyPlayed).data.items);
            } catch (err) {
                console.error(err)
            }
        };

        fetchData();
    }, [])

        return (
            <div className="profile-container">
                {user ? (
                    <>
                        <h1>Welcome {user.display_name}</h1>
                        <h2>Recently Played Tracks:</h2>
                        <ul>
                            {tracks.map(track => (
                                <li key={track.track.id}>
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