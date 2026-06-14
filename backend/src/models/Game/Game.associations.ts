import GameVideo from "../GameVideo/GameVideo.model";
import User from "../User/User.model";
import Game from "./Game.model";

Game.belongsTo(User, {
  foreignKey: 'userId'
})

Game.hasMany(GameVideo, {
  foreignKey: "gameId"
});