"use client";

import './globals.css'
import './home.css'
import HomeMenu from '../components/Homemenu/homemenu'

export default function Home() {
  return (
    <div className="home_container">
      <div className="home_menu_comp">
      <span className="landing_text">Welcome to Guessr<br/>The YouTube Edition</span>
        <HomeMenu/>
      </div>
    </div>
  );
}