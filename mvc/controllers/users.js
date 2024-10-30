import User from '../models/user.js';

export default {
    index: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('index', {users});
        } catch (error) {
            res.status(500).send("Error al obtener usuarios.");
        }
    },

    create: async (req, res) => {
        const {name, email} = req.body;
        try {
            await User.create({name, email});
            res.redirect('/');
        } catch (error) {
            res.status(500).send("Error al crear usuario.");
        }
    },

    delete: async (req, res) => {
        const email = req.body.email;
        try {
            await User.destroy({where: {email}});
            res.redirect('/');
        } catch (error) {
            res.status(500).send("Error al eliminar usuario.");
        }
    }
};