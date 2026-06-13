import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import CVSequelize from '../init';

class Video extends Model<InferAttributes<Video>, InferCreationAttributes<Video>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  //// Attributes
  // Video-related
  declare title: string;
  declare description: string;
  declare thumbnail: string;
  declare channelTitle: string;
  declare viewCount: number;
  declare likeCount: number;
  declare commentCount: number;
  declare category: number;
  declare publishedAt: Date;

  // Game-related
  declare theme: string;
  declare active: boolean; // only changed by cron
  declare gameMode: string;
}

Video.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    primaryKey: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  channelTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'channel_title'
  },
  viewCount: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'view_count'
  },
  likeCount: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'like_count'
  },
  commentCount: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'comment_count'
  },
  category: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'published_at'
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  gameMode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'game_mode',
    primaryKey: true
  }
}, {
  tableName: 'Videos',
  sequelize: CVSequelize
});

export default Video; 