import React, {useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Callback.css'

export default function Callback() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate()

    useEffect(() => {
        if (code) {
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('redirect_uri', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
            params.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
            params.append('client_secret', import.meta.env.VITE_SPOTIFY_CLIENT_SECRET);

            axios.post('https://accounts.spotify.com/api/token', params)
                .then (res => {
                    const { access_token } = res.data;
                    localStorage.setItem('spotify_access_token', access_token);
                    navigate('/profile')
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [code])

    return (
        <div className="callback-container">
            <h1 className="callback-title">Callback</h1>
            <p className="callback-text">Processing...</p>
        </div>
    )
}