
interface GameModuleVideoProps {
  videoId: string;
  videoTitle: string;
}


const GameModuleVideo = ({ videoId, videoTitle }: GameModuleVideoProps) => {
  return (
    <div className="m-2">
      <iframe width="1024" height="576"
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