const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// =====================================
// REGISTRO
// =====================================

router.post(
    "/registro",
    authController.registrar
);

// =====================================
// INICIO DE SESIÓN
// =====================================

router.post(
    "/login",
    authController.login
);

module.exports = router;