import { fetchVideos } from "@/actions/videos";
import GameModule from "@/components/GameModule/gamemodule";

export default async function Viewers() {
  let videoData: any[] = [];
  try {
    videoData = await fetchVideos();
  } catch (error) {
    console.error('Error fetching videos:', error);
  }

  return (
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
      <GameModule videos={videoData} />
    </div>
  );
}
