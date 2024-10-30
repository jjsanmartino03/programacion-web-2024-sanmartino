import database from '../config/database.js'
import { DataTypes } from "sequelize";

const vehiculos = database.define('vehiculoss', {
    tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    anio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    patente: {
            type: DataTypes.STRING,
            allowNull: false
        },
    colo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default vehiculos;
