import database from '../config/database.js'
import { DataTypes } from "sequelize";

const Tienda = database.define('Tienda', {
    nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
    duenio: {
            type: DataTypes.STRING,
            allowNull: false
        },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default Tienda;
