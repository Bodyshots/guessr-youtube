import './globals.css'
import './home.css'
import HomeMenu from '../components/homemenu/page'

export default function Home() {
  return (
    <div className="home_container">
      <span className="landing_text">testing home</span>
      <div className="home_menu_comp">
        <HomeMenu/>
      </div>
    </div>
  );
}
