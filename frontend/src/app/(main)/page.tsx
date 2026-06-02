import { fetchVideos } from '@/actions/videos';
import HomeFooter from '@/components/HomeFooter/HomeFooter';
import HomeMenu from '@/components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';
import { capitalizeString } from '@/lib/utils';

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
        <div className="todaysTheme mb-6 mt-2 text-4xl flex flex-col gap-2">
          <span>Today&apos;s theme:</span>
          <span className='font-semibold'>{capitalizeString(videoData[0]?.theme || '')}</span>
        </div>
        <HomeMenu />
      </div>
      <HomeFooter />
    </div>
  );
}