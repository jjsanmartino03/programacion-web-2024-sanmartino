import celular from "../models/celular.js";

// Obtener todos los celulars
export const getcelulars = async (req, res) => {
    try {
        const celulars = await celular.findAll();
        res.json(celulars);
    } catch (error) {
        res.status(500).send('Error al obtener los celulars');
    }
};

// Crear nuevo celular
export const createcelular = async (req, res) => {
    try {
        const { marca, modelo, anio } = req.body;
        await celular.create({ marca, modelo, anio });
        res.status(201).json({ message: 'celular creado' });
    } catch (error) {
        res.status(500).send('Error al crear el celular');
    }
};

export const deletecelular = async (req, res) => {
    try {
        const { id } = req.params;
        await celular.destroy({ where: { id } });
        res.json({ message: 'celular eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el celular');
    }
}

export const updatecelular = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, anio } = req.body;
        await celular.update({ marca, modelo, anio }, { where: { id } });
        res.json({ message: 'celular actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el celular');
    }
}
