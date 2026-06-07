
interface GameModuleVideoProps {
  videoId: string;
  videoTitle: string;
}


const GameModuleVideo = ({ videoId, videoTitle }: GameModuleVideoProps) => {
  return (
    <div className="flex justify-center m-4 w-full">
      <iframe className="aspect-video max-w-4xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={videoTitle}
        allow="accelerometer;
            autoplay; clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default GameModuleVideo