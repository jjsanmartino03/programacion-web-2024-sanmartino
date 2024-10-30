import empleado from "../models/empleado.js";

// Obtener todos los empleados
export const getempleados = async (req, res) => {
    try {
        const empleados = await empleado.findAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).send('Error al obtener los empleados');
    }
};

// Crear nuevo empleado
export const createempleado = async (req, res) => {
    try {
        const { nombre } = req.body;
        await empleado.create({ nombre });
        res.status(201).json({ message: 'empleado creado' });
    } catch (error) {
        res.status(500).send('Error al crear el empleado');
    }
};

export const deleteempleado = async (req, res) => {
    try {
        const { id } = req.params;
        await empleado.destroy({ where: { id } });
        res.json({ message: 'empleado eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el empleado');
    }
}

export const updateempleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await empleado.update({ nombre }, { where: { id } });
        res.json({ message: 'empleado actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el empleado');
    }
}
