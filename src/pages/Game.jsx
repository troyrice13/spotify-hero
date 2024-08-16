import React, { useState, useEffect } from "react";
import './Game.css';

export default function Game() {
    const [notes, setNotes] = useState([]);
    const [score, setScore] = useState(0);

    // Create Notes
    useEffect(() => {
        const interval = setInterval(() => {
            setNotes(prevNotes => [...prevNotes, { id: Date.now(), top: 0 }])
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    // Create Game Loop
    useEffect(() => {
        const gameLoop = () => {
            setNotes(prevNotes => prevNotes.map(note => ({
                ...note,
                top: note.top + 5
            })))
            requestAnimationFrame(gameLoop)
        }

        gameLoop()
    }, [])

    // Handle Key Presses
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                const hittableNotes = notes.filter(note => note.top > 500 && note.top < 600)
                if (hittableNotes.length > 0) {
                    console.log('Hit!')
                    setScore(prevScore => prevScore + 1)
                    setNotes(prevNotes => prevNotes.filter(note => !hittableNotes.includes(note)))
                }
                
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress)

    }, [notes])

    return (
        <div className="game-container">
            <h1 className="score">Score: {score}</h1>
            {notes.map(note => (
                <div
                    key={note.id}
                    className="note"
                    style={{ top: `${note.top}px` }}
                ></div>
            ))}
        </div>
    )
}