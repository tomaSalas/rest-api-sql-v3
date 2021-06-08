const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is require"
          },
          notEmpty: {
            msg: "please provide a first name"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is require"
          },
          notEmpty: {
            msg: "please provide a last name"
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists"
        },
        validate: {
          notNull: {
            msg: "An email is require"
          },
          isEmail: {
            msg: "please provide a valid email address"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is require"
          },
          notEmpty: {
            msg: "please provide a password"
          },
        },
        //   len: {
        //     args: [8, 20],
        //     msg: "The password must be between 8 and 20 lenght "
        //   }
        set(val) {
          this.setDataValue("password", bcrypt.hashSync(val, 10));
          
        }
      },
    }, { sequelize });

    User.associate = (models) => {
        // TODO Add associations.
        User.hasMany(models.Course, {
          foreignKey: {
            fieldName: "userId",
            allowNull: false,
          },
        });
      };
    return User;
  };



  // examples for password validation 

//   password: {
//     type: DataTypes.VIRTUAL,
//     allowNull: false,
//     validate: {
//       notNull: {
//         msg: "A password is require"
//       },
//       notEmpty: {
//         msg: "please provide a password"
//       },
//       len: {
//         args: [8, 20],
//         msg: "The password must be between 8 and 20 lenght "
//       }
//     }
//   },


// confirmPassword: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     set(val) {
//       if ( val === this.password) {
//         const hashedPassword = bcrypt.hashSync(val, 10);
//         this.setDataValue("confirmPassword", hashedPassword);
//       }
//     },
//     validate: {
//       notNull: {
//         msg: "Both passwords must match"
//       }
//     }
//   }
// }, { sequelize });

// return User;
// };