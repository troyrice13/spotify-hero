import React from "react";

export default function PlaybackControls({ player, currentTrack }) {
    const play = () => {
        if (player) {
            player.resume().then(() => {
                console.log("playback resumed")
            }).catch(err => console.error("Error resuming playback:", err))
        }
    }

    const pause = () => {
        if (player) {
            player.pause().then(() => {
                console.log('playback paused')
            }).catch(err => console.error("Error pausing playback:", err))
        }
    }

    const nextTrack = () => {
        if (player) {
            player.nextTrack().then(() => {
                console.log("skipped to next track")
            }).catch(err => console.error("Error skipping track:", err))
        }
    }

    const previousTrack = () => {
        if (player) {
            player.previousTrack().then(() => {
                console.log("skipped to previous track")
            }).catch(err => console.error("Error skipping to previous track:", err))
        }
    }

    const setVolume = (volume) => {
        if (player) {
            player.setVolume(volume).then(() => {
                console.log(`Volume set to ${volume * 100}%`)
            }).catch(err => console.error("Error setting volume:", err))
        }
    }

return (
    <div className="playback-controls">
        <button onClick={previousTrack}>Previous</button>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={nextTrack}>Next</button>
        <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setVolume(e.target.valueAsNumber)}
            defaultValue="0.5"
        />
    

    {currentTrack && (
        <div>
            <h3 className="current-track">{player ? `Now Playing: ${currentTrack.name} by ${currentTrack.artists[0].name}` : null}</h3>
        </div>
    )}
    </div>
)

};
