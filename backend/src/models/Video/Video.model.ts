import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import CVSequelize from '../init';

class Video extends Model<InferAttributes<Video>, InferCreationAttributes<Video>> {
  // Defaults
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Attributes
  declare title: string;
  declare description: string;
  declare thumbnail: string;
  declare channelTitle: string;
  declare viewCount: number;
  declare likeCount: number;
  declare commentCount: number;
  declare category: number;
  declare theme: string;
  declare publishedAt: Date;
}

Video.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
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
  title: {
    type: DataTypes.TEXT,
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
    type: DataTypes.TEXT,
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
  theme: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'published_at'
  }
}, {
  tableName: 'Videos',
  sequelize: CVSequelize
});

export default Video; 