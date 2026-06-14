import { DataTypes, QueryInterface, Sequelize, Transaction } from 'sequelize';

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      consent_token: {
        type: DataTypes.TEXT,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { transaction });

    await queryInterface.createTable('Videos', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
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
      channel_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      view_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      like_count: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      comment_count: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      category: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      game_mode: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, { transaction });

    await queryInterface.createTable('Games', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false
      },
      game_mode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      game_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      game_end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      guesses: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      statuses: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false
      }
    }, { transaction });

    await queryInterface.createTable('GameVideos', {
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Games',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      video_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      }
    }, { transaction });
  })
}


export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction: Transaction) => {
    await queryInterface.dropTable('GameVideos', { transaction })
    await queryInterface.dropTable('Games', { transaction })
    await queryInterface.dropTable('Videos', { transaction })
    await queryInterface.dropTable('Users', { transaction })
  })
}