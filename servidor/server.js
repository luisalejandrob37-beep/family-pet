// =====================================
// FAMILY PET - SERVIDOR NODE.JS
// =====================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// =====================================
// CREAR SERVIDOR
// =====================================

const app = express();

// =====================================
// CONEXIÓN MYSQL
// =====================================

require("./config/db");

// =====================================
// MIDDLEWARES
// =====================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// =====================================
// CARPETA PUBLIC
// =====================================

const publicPath = path.join(__dirname, "..", "Public");

app.use(express.static(publicPath));

// =====================================
// RUTA PRINCIPAL
// =====================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(publicPath, "family_pet.html")
    );

});

// =====================================
// ESTADO DE LA API
// =====================================

app.get("/api", (req, res) => {

    res.json({
        estado: "OK",
        mensaje: "API Family Pet funcionando correctamente"
    });

});

// =====================================
// RUTAS LOGIN Y REGISTRO
// =====================================

const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

// =====================================
// RUTAS CRUD DE USUARIOS
// =====================================

const usuariosRoutes = require("./routes/usuarios");

app.use("/usuarios", usuariosRoutes);

// =====================================
// PUERTO PARA RENDER
// =====================================

// Render proporciona el puerto mediante process.env.PORT.
// En local utilizará el puerto 3000.

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `🚀 Servidor Family Pet iniciado en el puerto ${PORT}`
    );

});