import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import database from './config/database.js'
import userRoutes from './routes/users.js'
import productRoutes from './routes/products.js'
import tiendaRoutes from './routes/Tienda.js'
import vehiculosRoutes from './routes/vehiculos.js'
import celularesRoutes from './routes/celular.js'
import empleadosRoutes from './routes/empleado.js'
import {fileURLToPath} from 'url'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

// Servir el archivo HTML
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/navbar.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'navbar.html'));
});

app.get('/tiendas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Tienda.html'));
})
app.get('/vehiculos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'vehiculos.html'));
})
app.get('/celulares', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'celular.html'));
})
app.get('/empleados', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'empleado.html'));
})

// Rutas para la API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tiendas', tiendaRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/celulars', celularesRoutes);
app.use('/api/empleados', empleadosRoutes);


// Sincronizar base de datos y arrancar el servidor
database.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
}).catch(error => console.log('Error al sincronizar la base de datos:', error));