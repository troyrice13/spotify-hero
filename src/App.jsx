import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from "./pages/Callback";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}