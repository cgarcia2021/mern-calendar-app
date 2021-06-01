const express = require('express');
const cors = require('cors');



//para usar variables de entorno
require('dotenv').config();
const { dbConnection } = require('./db/config');


console.log(process.env);

//Crear el sv de express
const app = express();


//Base de datos 
dbConnection();


//CORS
app.use(cors());

//Directorio público
app.use(express.static('public'));

// Lectura y parseo del body / todas las peticiones que vengan en json las proceso aca
app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));





//Escuchar peticiones
app.listen(process.env.PORT, (req, res) => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})