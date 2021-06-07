const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A title is require"
          },
          notEmpty: {
            msg: "please provide a title"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A description is require is require"
          },
          notEmpty: {
            msg: "please provide a last name"
          }
        }
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
    }, { sequelize });
    
    Course.associate = (models) => {
        // TODO Add associations.
        Course.belongsTo(models.User, {
          foreignKey: {
            fieldName: "userId",
            allowNull: false,
          },
        });
      };
    return Course;
  };