import { getVideos } from '@/actions/videos';
import ThemeHeader from '@/components/HomeFooter/ThemeHeader';
import HomeMenu from '@/components/Homemenu/homemenu';
import SiteTitle from '@/components/SiteTitle/sitetitle';
import { getQueryClient } from '@/providers/getQueryClient';

export default async function Home() {
  let videos: any[] = [];
  try {
    const queryClient = getQueryClient();
    videos = await queryClient.fetchQuery({
      queryKey: ['videos'],
      queryFn: getVideos
    })
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
    <div className="flex flex-col align-center text-center sm:ml-0 sm:align-left w-full p-8">
      <SiteTitle />
      <ThemeHeader
        theme={videos[0]?.theme || ''}
      />
      <div className="w-full sm:ml-0 py-4">
        <HomeMenu />
      </div>
    </div>
  );
}