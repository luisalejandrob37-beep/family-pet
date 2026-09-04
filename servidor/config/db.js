const mysql = require("mysql2");

const requiredVariables = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME"
];

const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    throw new Error(
        `Faltan variables de entorno de MySQL: ${missingVariables.join(", ")}`
    );
}

// =====================================
// CONEXIÓN MYSQL - FAMILY PET
// AIVEN + RENDER
// =====================================

const conexion = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: Number(process.env.DB_PORT || 3306),

    // Aiven requiere conexión SSL
    ssl: {
        rejectUnauthorized: false
    }

});

// =====================================
// COMPROBAR CONEXIÓN
// =====================================

conexion.connect((error) => {

    if (error) {

        console.log("❌ Error al conectar con MySQL");

        console.log(error);

        process.exit(1);
    }

    console.log("✅ MySQL conectado correctamente");

});

module.exports = conexion;