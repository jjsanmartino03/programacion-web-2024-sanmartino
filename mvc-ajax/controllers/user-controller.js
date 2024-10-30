import User from "../models/user.js";

// Obtener todos los usuarios

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear nuevo usuario
export const createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        await User.create({name, email});
        res.status(201).json({message: 'Usuario creado'});
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        await User.destroy({where: {id}});
        res.json({message: 'Usuario eliminado'});
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body;
        await User.update({name, email}, {where: {id}});
        res.json({message: 'Usuario actualizado'});
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
}