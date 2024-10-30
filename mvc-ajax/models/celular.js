import database from '../config/database.js'
import { DataTypes } from "sequelize";

const celular = database.define('celular', {
    marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
    modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    anio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default celular;
