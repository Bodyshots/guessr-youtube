import { fetchVideos } from "@/actions/videos";
import GameModule from "@/components/GameModule/gamemodule";
<<<<<<< HEAD
import GameModuleHeader from "@/components/GameModule/GameModuleHeader/GameModuleHeader";
=======
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)

export default async function Viewers() {
  let videoData: any[] = [];
  try {
    videoData = await fetchVideos();
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
<<<<<<< HEAD
    <div className="flex w-full align-center text-center flex-col flex-nowrap mb-auto justify-between h-full p-4">
      <GameModuleHeader />
=======
    <div className="flex w-full align-center text-center flex-col flex-nowrap m-auto justify-between h-full p-4">
      <div className="mainHeader flex flex-row justify-evenly min-w-5/12 mx-auto items-center">
        <div className="nextInSection">
          Next theme in:
          (temp time)
        </div>
        <div className="titleHeader flex flex-col">
          <span className="text-4xl font-bold font-yt_font">Guessr.yt</span>
          <span className="text-left">Viewers</span>
        </div>
        <div className="statsSection">
          stat buttons
        </div>
      </div>
>>>>>>> 691bbbc ((WIP) feat: dynamic viewer ytdle + supabase integration)
      <GameModule videos={videoData} />
    </div>
  );
}
