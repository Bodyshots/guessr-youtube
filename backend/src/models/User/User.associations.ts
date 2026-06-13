import Game from "../Game/Game.model";
import User from "./User.model";

User.hasMany(Game, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})