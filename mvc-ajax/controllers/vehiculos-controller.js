import Vehiculos from "../models/vehiculos.js";

// Obtener todos los vehiculos
export const getvehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculos.findAll();
        res.json(vehiculos);
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener los vehiculos');
    }
};

// Crear nuevo vehiculos
export const createvehiculos = async (req, res) => {
    try {
        const { tipo, anio, patente, colo } = req.body;
        await Vehiculos.create({ tipo, anio, patente, colo });
        res.status(201).json({ message: 'vehiculos creado' });
    } catch (error) {
        res.status(500).send('Error al crear el vehiculos');
    }
};

export const deletevehiculos = async (req, res) => {
    try {
        const { id } = req.params;
        await Vehiculos.destroy({ where: { id } });
        res.json({ message: 'vehiculos eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el vehiculos');
    }
}

export const updatevehiculos = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, anio, patente, colo } = req.body;
        await Vehiculos.update({ tipo, anio, patente, colo }, { where: { id } });
        res.json({ message: 'vehiculos actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el vehiculos');
    }
}
