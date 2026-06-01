import { fetchVideos } from '@/actions/videos';
import HomeMenu from '@/components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';

export default async function Home() {
  let videoData: any[] = [];
  try {
    videoData = await fetchVideos();
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
    <div className="flex flex-col align-center text-center sm:ml-0 sm:align-left w-full p-8">
      <SiteTitle />
      <div className="w-full sm:ml-0 py-4">
        <HomeMenu />
      </div>
    </div>
  );
}