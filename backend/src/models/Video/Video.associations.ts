import GameVideo from "../GameVideo/GameVideo.model";
import Video from "./Video.model";

Video.hasMany(GameVideo,
  {
    foreignKey: "videoId"
  }
);