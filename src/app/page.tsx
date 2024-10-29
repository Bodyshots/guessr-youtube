import './globals.css'
import './home.css'
import HomeMenu from '../components/Homemenu/page'

export default function Home() {
  return (
    <div className="home_container">
      <span className="landing_text">Guessr - YouTube Edition</span>
      <div className="home_menu_comp">
        <HomeMenu/>
      </div>
    </div>
  );
}