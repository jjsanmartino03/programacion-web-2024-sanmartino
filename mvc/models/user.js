import {DataTypes} from "sequelize";
import database from "../config/database.js";

// Definir el modelo User con Sequelize
const User = database.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

export default User