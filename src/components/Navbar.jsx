import React from "react";
import { Link} from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to='/'>
                    <img src="/discplayer.png" alt="Spotify Hero Logo" className="logo-image" />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/game">Game</Link>
            </div>
        </nav>
    )
}