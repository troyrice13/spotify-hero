# Jam Sesh - Spotify Hero

Work in Progress for a simple React application that integrates with Spotify to allow users to log in and view their recently played tracks. The application also sets up the foundation for a Guitar Hero-like game using Spotify's Web API.

Features
- Spotify OAuth Authentication: Users can log in with their Spotify account.
- Recently Played Tracks: Display the user's recently played tracks.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Spotify Developer account.

### Spotify Developer Setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Create a new application to get your `Client ID` and `Client Secret`.
3. Set a Redirect URI in your Spotify app settings, e.g., `http://localhost:3000/callback`.

## License
- This project is licensed under the MIT License - see the LICENSE file for details.


## Plugins
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
