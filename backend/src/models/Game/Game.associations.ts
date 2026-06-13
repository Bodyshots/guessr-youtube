import User from "../User/User.model";
import Video from "../Video/Video.model";
import Game from "./Game.model";

Game.belongsTo(User, {
  foreignKey: 'userId'
})

Game.belongsToMany(Video, {
  through: "GameVideos",
  foreignKey: 'gameId',
  otherKey: 'videoId'
})