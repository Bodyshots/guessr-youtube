import './globals.css';
import './home.css';
import HomeMenu from '../components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';

export default function Home() {
  return (
    <div className="home_container">
      <div className=" home_title">
        <SiteTitle/>
        <div className="flex flex-col gap-4">
          <span className="font-yt_font font-semibold text-muted-foreground/90">
          Click one of the buttons below to prepare a game!<br/>
          Alternatively, hover over a button to see a description of the game mode.
          </span>
        </div>
      </div>
      <div className="home_menu_comp">
        <HomeMenu/>
      </div>
    </div>
  );
}