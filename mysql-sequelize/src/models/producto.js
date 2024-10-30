// Agrega un nuevo modelo de base de datos llamado Producto, los campos son:
/*
codigoProducto: alfanumérico
nombre: string
cantidad: numero
precio: float
proveedor: Proveedor

Crea también una entidad Proveedor con los campos:
nombre: string
direccion: string


También agrega todas las restricciones que creas necesarias, not null, id autoincremental, etc.
 */

import sequelize from "../src/database.js";
import {DataTypes} from "sequelize";

const Producto = sequelize.define('producto', {
    codigoProducto: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'productos',
    timestamps: true,
});

const Proveedor = sequelize.define('proveedor', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condicionIva: {
        type: DataTypes.ENUM('Responsable Inscripto', 'Monotributista', 'Exento', 'No Responsable'),
        allowNull: false
    }
}, {
    tableName: 'proveedores',
    timestamps: true,
});

Producto.belongsTo(Proveedor, {
    foreignKey: 'proveedorId'
});

export {Producto, Proveedor};