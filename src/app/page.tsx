import './globals.css';
import './home.css';
import HomeMenu from '../components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';

export default function Home() {
  return (
    <div className="flex flex-col align-center text-center sm:ml-0 sm:align-left w-full p-8">
      <div className="hero-section flex flex-col flex-nowrap w-full align-center justify-center 
                      lg:h-2/5 md:h-1/3 rounded-xl shadow-md shadow-black dark:shadow-white">
        <div className="hero-content p-10">
          <span className="pb-24"><SiteTitle width={100} height={100} title_style='text-7xl'/></span>
          <div className="flex flex-col gap-4">
            <span className="font-yt_font font-semibold text-white/90">
              Click one of the buttons below to prepare a game!<br/>
              Alternatively, hover over a button to see a description of the game mode.
            </span>
          </div>
        </div>
      </div>
      <div className="w-full sm:ml-0">
        <HomeMenu/>
      </div>
    </div>
  );
}