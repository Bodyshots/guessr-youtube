import { fetchVideos } from "@/actions/videos";
import GameModule from "@/components/GameModule/gamemodule";
import GameModuleHeader from "@/components/GameModule/GameModuleHeader/GameModuleHeader";

export default async function Viewers() {
  let videoData: any[] = [];
  try {
    videoData = await fetchVideos();
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
    <div className="flex w-full align-center text-center flex-col flex-nowrap mb-auto justify-between h-full p-4">
      <GameModuleHeader />
      <GameModule videos={videoData} />
    </div>
  );
}
