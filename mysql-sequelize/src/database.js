import {Sequelize} from "sequelize";

// Configurar la conexión a la base de datos MySQL
const sequelize = new Sequelize('nombre_de_la_base_de_datos', 'usuario', 'contraseña', {
    dialect: 'sqlite',
    storage: './database.db'
});

// Verificar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a Sqlite exitosa.');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

export default sequelize;