
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

// --- Configuración de la Conexión a MySQL ---
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error('Error al conectar a la BD:', err);
            setTimeout(handleDisconnect, 2000); // Reintentar conexión
        } else {
            console.log('Conexión exitosa a la base de datos MySQL');
            db.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100)
        )
      `, (err) => {
                if (err) console.error("Error al crear tabla:", err);
                else console.log("Tabla 'usuarios' verificada/creada.");
            });
        }
    });

    db.on('error', err => {
        console.error('Error en la BD:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// --- Endpoints Requeridos ---

// 1. Endpoint con tu apellido
app.get('/api/hueytlelt', (req, res) => {
    res.json({ nombreCompleto: "Gael Andre Hueytlelt Villalobos" });
});

// 2. CRUD: Crear un usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).send('El nombre es requerido');
    }
    db.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar en la BD');
        }
        res.status(201).json({ id: result.insertId, nombre });
    });
});

// 3. CRUD: Leer todos los usuarios
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer de la BD');
        }
        res.json(results);
    });
});

// --- Iniciar Servidor ---
app.listen(port, () => {
    console.log(`API Backend escuchando en http://localhost:${port}`);
});