'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pledge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pledge.belongsTo(models.User, { foreignKey: 'userId' })
      Pledge.belongsTo(models.Project, { foreignKey: 'projectId' })
    }
  }
  Pledge.init(
    {
      tier: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      stripeData: {
        type: DataTypes.STRING,
        allowNull: false
      },
      collected: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      projectId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Pledge',
      tableName: 'pledges'
    }
  )
  return Pledge
}
