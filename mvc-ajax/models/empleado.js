import database from '../config/database.js'
import { DataTypes } from "sequelize";

const empleado = database.define('empleado', {
    nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default empleado;
