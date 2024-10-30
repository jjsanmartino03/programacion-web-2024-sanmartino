const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());


// Conectar a la base de datos SQLite o crear una nueva
const db = new sqlite3.Database('./usuarios.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tabla de usuarios si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL
)`);

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ mensaje: 'Error al obtener usuarios' });
            return;
        }
        res.json(rows);
    });
});

// Ruta para agregar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre, correo } = req.body;

    if (!nombre || !correo) {
        return res.status(400).json({ mensaje: 'Nombre y correo son requeridos' });
    }

    const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
    db.run(sql, [nombre, correo], function (err) {
        if (err) {
            res.status(500).json({ mensaje: 'Error al agregar usuario' });
            return;
        }
        res.status(201).json({ mensaje: 'Usuario creado correctamente', id: this.lastID });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});