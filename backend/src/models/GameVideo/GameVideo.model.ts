import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import CVSequelize from '../init';
import Game from '../Game/Game.model';
import Video from '../Video/Video.model';

class GameVideo extends Model<InferAttributes<GameVideo>, InferCreationAttributes<GameVideo>> {
  // Defaults
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare gameId: ForeignKey<string>;
  declare videoId: ForeignKey<string>;

  static async addVideos(game: Game, videos: Video[]): Promise<GameVideo[]> {
    const videoIds = videos.map((video) => video.id);
    return await GameVideo.bulkCreate(
      videoIds.map((videoId) => ({ gameId: game.id, videoId, })),
      {
        ignoreDuplicates: true,
      }
    );
  }

  static async addGames(video: Video, games: Game[]): Promise<GameVideo[]> {
    const gameIds = games.map((game) => game.id);
    return await GameVideo.bulkCreate(
      gameIds.map((gameId) => ({ videoId: video.id, gameId, })),
      {
        ignoreDuplicates: true,
      }
    );
  }

}

GameVideo.init({
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  },
  gameId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Games',
      key: 'id'
    },
    field: "game_id",
    onDelete: 'CASCADE',
    primaryKey: true
  },
  videoId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Videos',
      key: 'id'
    },
    field: "video_id",
    onDelete: 'CASCADE',
    primaryKey: true
  }
}, {
  tableName: 'GameVideos',
  sequelize: CVSequelize
});

export default GameVideo; 