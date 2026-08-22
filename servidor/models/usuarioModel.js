const db = require("../config/db");

// =====================================
// CREAR USUARIO
// =====================================

const crearUsuario = (

    nombre,
    apellido,
    usuario,
    correo,
    telefono,
    contrasena,
    callback

) => {

    const sql = `

        INSERT INTO usuarios

        (
            nombre,
            apellido,
            usuario,
            correo,
            telefono,
            contrasena
        )

        VALUES (?, ?, ?, ?, ?, ?)

    `;

    db.query(

        sql,

        [

            nombre,
            apellido,
            usuario,
            correo,
            telefono,
            contrasena

        ],

        callback

    );

};

// =====================================
// BUSCAR USUARIO POR CORREO
// =====================================

const buscarPorCorreo = (

    correo,

    callback

) => {

    const sql = `

        SELECT *

        FROM usuarios

        WHERE correo = ?

    `;

    db.query(

        sql,

        [correo],

        callback

    );

};

// =====================================
// BUSCAR USUARIO POR ID
// =====================================

const buscarPorId = (

    id,

    callback

) => {

    const sql = `

        SELECT *

        FROM usuarios

        WHERE id = ?

    `;

    db.query(

        sql,

        [id],

        callback

    );

};

// =====================================
// OBTENER TODOS LOS USUARIOS
// =====================================

const obtenerUsuarios = (

    callback

) => {

    const sql = `

        SELECT

            id,

            nombre,

            apellido,

            usuario,

            correo,

            telefono,

            fecha_registro

        FROM usuarios

        ORDER BY id DESC

    `;

    db.query(

        sql,

        callback

    );

};

// =====================================
// ELIMINAR USUARIO
// =====================================

const eliminarUsuario = (

    id,

    callback

) => {

    const sql = `

        DELETE FROM usuarios

        WHERE id = ?

    `;

    db.query(

        sql,

        [id],

        callback

    );

};

module.exports = {

    crearUsuario,

    buscarPorCorreo,

    buscarPorId,

    obtenerUsuarios,

    eliminarUsuario

};