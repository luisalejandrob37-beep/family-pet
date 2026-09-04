const express = require("express");
const router = express.Router();

const usuarioModel = require("../models/usuarioModel");
const authController = require("../controllers/authController");
const db = require("../config/db");

// =====================================
// OBTENER TODOS LOS USUARIOS
// GET /usuarios
// =====================================

router.get("/", (req, res) => {

    usuarioModel.obtenerUsuarios((error, resultados) => {

        if (error) {

            console.error(
                "Error al obtener usuarios:",
                error
            );

            return res.status(500).json({
                error: "Error al obtener los usuarios"
            });
        }

        res.json(resultados);

    });

});


// =====================================
// OBTENER USUARIO POR ID
// GET /usuarios/:id
// =====================================

router.get("/:id", (req, res) => {

    const id = req.params.id;

    usuarioModel.buscarPorId(
        id,
        (error, resultados) => {

            if (error) {

                console.error(
                    "Error al buscar usuario:",
                    error
                );

                return res.status(500).json({
                    error: "Error al buscar el usuario"
                });
            }

            if (resultados.length === 0) {

                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            res.json(resultados[0]);

        }
    );

});


// =====================================
// CREAR USUARIO
// POST /usuarios
// =====================================

router.post("/", (req, res) => {
    req.body.password = req.body.contrasena;
    return authController.registrar(req, res);
});


// =====================================
// ACTUALIZAR USUARIO
// PUT /usuarios/:id
// =====================================

router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        nombre,
        apellido,
        usuario,
        correo,
        telefono
    } = req.body;


    // =====================================
    // VALIDAR CAMPOS
    // =====================================

    if (
        !nombre ||
        !apellido ||
        !usuario ||
        !correo
    ) {

        return res.status(400).json({
            error:
                "Nombre, apellido, usuario y correo son obligatorios"
        });
    }


    // =====================================
    // ACTUALIZAR
    // =====================================

    const sql = `

        UPDATE usuarios

        SET
            nombre = ?,
            apellido = ?,
            usuario = ?,
            correo = ?,
            telefono = ?

        WHERE id = ?

    `;


    db.query(

        sql,

        [
            nombre,
            apellido,
            usuario,
            correo,
            telefono,
            id
        ],

        (error, resultado) => {

            if (error) {

                console.error(
                    "Error al actualizar usuario:",
                    error
                );


                // Usuario o correo repetido
                if (
                    error.code === "ER_DUP_ENTRY"
                ) {

                    return res.status(409).json({
                        error:
                            "El usuario o correo ya existe"
                    });
                }


                return res.status(500).json({
                    error:
                        "Error al actualizar el usuario"
                });
            }


            // Usuario inexistente
            if (
                resultado.affectedRows === 0
            ) {

                return res.status(404).json({
                    error:
                        "Usuario no encontrado"
                });
            }


            res.json({

                mensaje:
                    "Usuario actualizado correctamente"

            });

        }

    );

});


// =====================================
// ELIMINAR USUARIO
// DELETE /usuarios/:id
// =====================================

router.delete("/:id", (req, res) => {

    const id = req.params.id;


    usuarioModel.eliminarUsuario(

        id,

        (error, resultado) => {

            if (error) {

                console.error(
                    "Error al eliminar usuario:",
                    error
                );

                return res.status(500).json({
                    error:
                        "Error al eliminar el usuario"
                });
            }


            // Usuario inexistente
            if (
                resultado.affectedRows === 0
            ) {

                return res.status(404).json({
                    error:
                        "Usuario no encontrado"
                });
            }


            res.json({

                mensaje:
                    "Usuario eliminado correctamente"

            });

        }

    );

});


module.exports = router;