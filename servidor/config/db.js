const mysql = require("mysql2");

// =====================================
// CONEXIÓN MYSQL - FAMILY PET
// AIVEN + RENDER
// =====================================

const conexion = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT || 3306,

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

        return;
    }

    console.log("✅ MySQL conectado correctamente");

});

module.exports = conexion;