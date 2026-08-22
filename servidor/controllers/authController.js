const bcrypt = require("bcrypt");

const usuarioModel = require("../models/usuarioModel");

// =====================================
// REGISTRAR USUARIO
// =====================================

const registrar = async (req, res) => {

    const {

        nombre,
        apellido,
        usuario,
        correo,
        telefono,
        password

    } = req.body;

    // Validar campos

    if (
        !nombre ||
        !apellido ||
        !usuario ||
        !correo ||
        !telefono ||
        !password
    ) {

        return res.status(400).json({

            mensaje: "Todos los campos son obligatorios."

        });

    }

    try {

        // Encriptar contraseña

        const passwordEncriptada =
            await bcrypt.hash(password, 10);

        // Guardar usuario en MySQL

        usuarioModel.crearUsuario(

            nombre,

            apellido,

            usuario,

            correo,

            telefono,

            passwordEncriptada,

            (error, resultado) => {

                if(error){

                    console.error(
                        "ERROR MYSQL:",
                        error
                    );

                    // Usuario o correo repetido

                    if(error.code === "ER_DUP_ENTRY"){

                        return res.status(400).json({

                            mensaje:
                            "El usuario o correo ya están registrados."

                        });

                    }

                    return res.status(500).json({

                        mensaje:
                        "Error guardando usuario.",

                        error:error.sqlMessage

                    });

                }

                return res.status(201).json({

                    mensaje:
                    "✅ Usuario registrado correctamente.",

                    id:
                    resultado.insertId

                });

            }

        );

    } catch(error){

        console.error(error);

        return res.status(500).json({

            mensaje:
            "Error del servidor."

        });

    }

};

// =====================================
// INICIAR SESIÓN
// =====================================

const login = async (req,res)=>{

    const {

        correo,

        password

    } = req.body;

    // Validar datos

    if(!correo || !password){

        return res.status(400).json({

            mensaje:
            "Correo y contraseña son obligatorios."

        });

    }

    try {

        usuarioModel.buscarPorCorreo(

            correo,

            async(error,resultados)=>{

                if(error){

                    console.error(error);

                    return res.status(500).json({

                        mensaje:
                        "Error consultando usuario."

                    });

                }

                // Usuario no existe

                if(resultados.length === 0){

                    return res.status(401).json({

                        mensaje:
                        "Correo o contraseña incorrectos."

                    });

                }

                const usuarioBD =
                resultados[0];

                // Comparar contraseña

                const coincide =
                await bcrypt.compare(

                    password,

                    usuarioBD.contrasena

                );

                if(!coincide){

                    return res.status(401).json({

                        mensaje:
                        "Correo o contraseña incorrectos."

                    });

                }

                // Login correcto

                return res.status(200).json({

                    mensaje:
                    "✅ Inicio de sesión exitoso.",

                    usuario:{

                        id:
                        usuarioBD.id,

                        nombre:
                        usuarioBD.nombre,

                        apellido:
                        usuarioBD.apellido,

                        usuario:
                        usuarioBD.usuario,

                        correo:
                        usuarioBD.correo,

                        telefono:
                        usuarioBD.telefono

                    }

                });

            }

        );

    } catch(error){

        console.error(error);

        return res.status(500).json({

            mensaje:
            "Error interno del servidor."

        });

    }

};

// =====================================
// EXPORTAR CONTROLADORES
// =====================================

module.exports = {

    registrar,

    login

};