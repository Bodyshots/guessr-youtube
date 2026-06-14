import Game from "../Game/Game.model";
import Video from "../Video/Video.model";
import GameVideo from "./GameVideo.model";

GameVideo.belongsTo(Game);
GameVideo.belongsTo(Video);