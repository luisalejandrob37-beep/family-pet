/* =========================================================
   BASE DE DATOS - FAMILY PET
   ========================================================= */

-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS family_pet;

-- Crear la base de datos
CREATE DATABASE family_pet;

-- Usar la base de datos
USE family_pet;

/* =========================================================
   TABLA USUARIOS
   ========================================================= */

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   TABLA MASCOTAS
   ========================================================= */

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(100),
    sexo ENUM('Macho', 'Hembra'),
    edad VARCHAR(30),
    peso DECIMAL(5,2),
    color VARCHAR(50),
    estado ENUM('Disponible', 'Adoptada', 'En tratamiento')
        DEFAULT 'Disponible'
);

/* =========================================================
   TABLA CONSULTAS
   ========================================================= */

CREATE TABLE consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    mascota_id INT,
    motivo VARCHAR(255),
    fecha DATE,
    hora TIME,
    estado ENUM('Pendiente', 'Atendida', 'Cancelada')
        DEFAULT 'Pendiente',

    CONSTRAINT fk_consultas_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_consultas_mascota
        FOREIGN KEY (mascota_id)
        REFERENCES mascotas(id)
);

/* =========================================================
   TABLA VACUNAS
   ========================================================= */

CREATE TABLE vacunas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT,
    vacuna VARCHAR(100),
    fecha DATE,

    CONSTRAINT fk_vacunas_mascota
        FOREIGN KEY (mascota_id)
        REFERENCES mascotas(id)
);

/* =========================================================
   TABLA ADOPCIONES
   ========================================================= */

CREATE TABLE adopciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    mascota_id INT,
    fecha DATE,
    estado ENUM('Pendiente', 'Aprobada', 'Rechazada')
        DEFAULT 'Pendiente',

    CONSTRAINT fk_adopciones_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_adopciones_mascota
        FOREIGN KEY (mascota_id)
        REFERENCES mascotas(id)
);

/* =========================================================
   TABLA CONTACTO
   ========================================================= */

CREATE TABLE contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(150),
    asunto VARCHAR(150),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================================
   INSERTAR USUARIOS
   ========================================================= */

INSERT INTO usuarios
(nombre, apellido, usuario, correo, telefono, contrasena)
VALUES
('Luis', 'Betancourt', 'luis', 'luis@gmail.com', '3001111111', '123456'),
('María', 'Gómez', 'maria', 'maria@gmail.com', '3012222222', '123456'),
('Carlos', 'Pérez', 'carlos', 'carlos@gmail.com', '3023333333', '123456'),
('Ana', 'Rodríguez', 'ana', 'ana@gmail.com', '3034444444', '123456'),
('Juan', 'Martínez', 'juan', 'juan@gmail.com', '3045555555', '123456');

/* =========================================================
   INSERTAR MASCOTAS
   ========================================================= */

INSERT INTO mascotas
(nombre, especie, raza, sexo, edad, peso, color, estado)
VALUES
('Max', 'Perro', 'Labrador', 'Macho', '2 años', 25.50, 'Dorado', 'Disponible'),
('Luna', 'Gato', 'Siamés', 'Hembra', '1 año', 4.20, 'Blanco', 'Disponible'),
('Rocky', 'Perro', 'Bulldog', 'Macho', '5 meses', 8.30, 'Café', 'Disponible'),
('Milo', 'Gato', 'Persa', 'Macho', '8 meses', 3.90, 'Gris', 'Disponible'),
('Nala', 'Perro', 'Poodle', 'Hembra', '6 meses', 6.50, 'Blanco', 'Disponible');

/* =========================================================
   INSERTAR CONSULTAS
   ========================================================= */

INSERT INTO consultas
(usuario_id, mascota_id, motivo, fecha, hora)
VALUES
(1, 1, 'Control general', '2026-08-10', '09:00:00'),
(2, 2, 'Vacunación', '2026-08-11', '10:30:00'),
(3, 3, 'Desparasitación', '2026-08-12', '11:00:00');

/* =========================================================
   INSERTAR VACUNAS
   ========================================================= */

INSERT INTO vacunas
(mascota_id, vacuna, fecha)
VALUES
(1, 'Rabia', '2026-01-15'),
(2, 'Triple Felina', '2026-02-20'),
(3, 'Parvovirus', '2026-03-10');

/* =========================================================
   INSERTAR ADOPCIONES
   ========================================================= */

INSERT INTO adopciones
(usuario_id, mascota_id, fecha, estado)
VALUES
(4, 5, '2026-08-05', 'Pendiente'),
(5, 4, '2026-08-06', 'Aprobada');

/* =========================================================
   INSERTAR CONTACTO
   ========================================================= */

INSERT INTO contacto
(nombre, correo, asunto, mensaje)
VALUES
('Pedro', 'pedro@gmail.com', 'Información',
 'Quiero conocer los servicios.'),

('Laura', 'laura@gmail.com', 'Adopción',
 'Estoy interesada en adoptar una mascota.');

/* =========================================================
   CONSULTAR TABLAS
   ========================================================= */

SELECT * FROM usuarios;

SELECT * FROM mascotas;

SELECT * FROM consultas;

SELECT * FROM vacunas;

SELECT * FROM adopciones;

SELECT * FROM contacto;

/* =========================================================
   BUSCAR USUARIO
   ========================================================= */

SELECT *
FROM usuarios
WHERE usuario = 'luis';

/* =========================================================
   ACTUALIZAR USUARIO
   ========================================================= */

UPDATE usuarios
SET telefono = '3209999999'
WHERE id = 1;

/* =========================================================
   ELIMINAR USUARIO
   ========================================================= */

-- Primero eliminamos los registros relacionados
-- con el usuario 5 en adopciones.

DELETE FROM adopciones
WHERE usuario_id = 5;

-- Ahora sí podemos eliminar el usuario.

DELETE FROM usuarios
WHERE id = 5;

/* =========================================================
   VERIFICAR QUE EL USUARIO FUE ELIMINADO
   ========================================================= */

SELECT *
FROM usuarios;

/* =========================================================
   CONTAR REGISTROS
   ========================================================= */

SELECT COUNT(*) AS Usuarios
FROM usuarios;

SELECT COUNT(*) AS Mascotas
FROM mascotas;

SELECT COUNT(*) AS Consultas
FROM consultas;

SELECT COUNT(*) AS Vacunas
FROM vacunas;

SELECT COUNT(*) AS Adopciones
FROM adopciones;

/* =========================================================
   VERIFICAR ADOPCIONES
   ========================================================= */

SELECT *
FROM adopciones;