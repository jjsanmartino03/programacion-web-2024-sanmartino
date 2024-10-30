import Tienda from "../models/Tienda.js";

// Obtener todos los Tiendas
export const getTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.findAll();
        res.json(tiendas);
    } catch (error) {
        res.status(500).send('Error al obtener los tiendas');
    }
};

// Crear nuevo Tienda
export const createTienda = async (req, res) => {
    try {
        const { nombre, ciudad, duenio } = req.body;
        await Tienda.create({ nombre, ciudad, duenio });
        res.status(201).json({ message: 'Tienda creado' });
    } catch (error) {
        res.status(500).send('Error al crear el tienda');
    }
};

export const deleteTienda = async (req, res) => {
    try {
        const { id } = req.params;
        await Tienda.destroy({ where: { id } });
        res.json({ message: 'Tienda eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el tienda');
    }
}

export const updateTienda = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ciudad, duenio } = req.body;
        await Tienda.update({ nombre, ciudad, duenio }, { where: { id } });
        res.json({ message: 'Tienda actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el tienda');
    }
}
