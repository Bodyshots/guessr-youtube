import Game from "../Game/Game.model";
import Video from "./Video.model";

Video.belongsToMany(Game, {
  through: "GameVideos",
  foreignKey: "videoId",
  otherKey: "gameId"
})