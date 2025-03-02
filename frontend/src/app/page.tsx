import './globals.css';
import './home.css';
import HomeMenu from '@/components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';

export default function Home() {
  return (
    <div className="flex flex-col align-center text-center sm:ml-0 sm:align-left w-full p-8">
      <SiteTitle/>
      <div className="w-full sm:ml-0">
        <HomeMenu/>
      </div>
    </div>
  );
}