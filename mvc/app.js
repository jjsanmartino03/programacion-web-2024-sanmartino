import express from 'express';
import bodyParser from "express";
import userRoutes from './routes/users.js';
import database from "./config/database.js";


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


// Motor de vistas
app.set('view engine', 'hbs');

// Rutas
app.use('/', userRoutes);

// Sincronización con la base de datos y arranque del servidor
database.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});