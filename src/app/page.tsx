import './globals.css';
import './home.css';
import HomeMenu from '../components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';

export default function Home() {
  return (
    <div className="home_container">
      <div className="home_menu_comp">
      {/* <Image src={logo_img} alt="logo" width={500} height={300}/> */}
      <SiteTitle/>
      {/* <span className={`landing_text ${gothicFont.className}`}>Welcome to Guessr<br/>The YouTube Edition</span> */}
        <HomeMenu/>
      </div>
    </div>
  );
}