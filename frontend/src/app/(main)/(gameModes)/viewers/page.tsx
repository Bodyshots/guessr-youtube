import { fetchVideos } from "@/actions/videos";
import GameModuleHL from "@/components/GameModule/GameModuleHL/GameModuleHL";
import GameModuleHeader from "@/components/GameModule/GameModuleHeader/GameModuleHeader";
import { GameModeConstants } from "@/constants/game";

export default async function Viewers() {
  let videoData: any[] = [];
  try {
    videoData = await fetchVideos();
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
    <div className="flex w-full align-center text-center flex-col flex-nowrap mb-auto justify-between h-full p-4">
      <GameModuleHeader currentTheme={videoData[0]?.theme || ''} />
      <GameModuleHL
        gameMode={GameModeConstants.VIEWERS}
        videos={videoData}
      />
    </div>
  );
}
