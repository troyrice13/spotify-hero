import React, { useState, useEffect } from "react";
import './Home.css';

export default function Home() {
    const handleLogin = () => {
        const redirectUri = 'http://127.0.0.1:5173/callback';
        const clientId = '8edc5a3ad52e4f1f9447e2f91fd06fd3';
        const scopes = 'user-read-private user-read-email user-read-recently-played';

        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Jam Sesh</h1>
            <button className="home-button" onClick={handleLogin}>Login to Spotify</button>
        </div>
    )
}