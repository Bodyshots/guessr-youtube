import { getVideos } from "@/actions/videos";
import GameModuleHL from "@/components/GameModule/GameModuleHL/GameModuleHL";
import GameModuleHeader from "@/components/GameModule/GameModuleHeader/GameModuleHeader";
import { GameModeConstants } from "@/constants/game";
import { getQueryClient } from "@/providers/getQueryClient";

export default async function Viewers() {
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
    <div className="flex w-full align-center text-center flex-col flex-nowrap mb-auto justify-between h-full p-4">
      <GameModuleHeader currentTheme={videos[0]?.theme || ''} />
      <GameModuleHL
        gameMode={GameModeConstants.VIEWERS}
        videos={videos}
      />
    </div>
  );
}
