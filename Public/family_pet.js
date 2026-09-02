/*==================================================
                FAMILY PET
                family_pet.js
==================================================*/

/*=========================================
MENÚ MÓVIL
=========================================*/

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("activo");

    });

}

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768) {

            menu.classList.remove("activo");

        }

    });

});

//SLIDER AUTOMÁTICO

const slides = document.querySelectorAll(".slide");

let posicionSlide = 0;

function cambiarSlide() {

    if (slides.length === 0) return;

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    posicionSlide++;

    if (posicionSlide >= slides.length) {

        posicionSlide = 0;

    }

    slides[posicionSlide].classList.add("active");

}

if (slides.length > 0) {

    setInterval(cambiarSlide, 4000);

}

//MODO OSCURO

const botonOscuro = document.getElementById("modoOscuro");

if (botonOscuro) {

    if (localStorage.getItem("tema") === "oscuro") {

        document.body.classList.add("oscuro");

        botonOscuro.innerHTML = "☀️ Modo Claro";

    }

    botonOscuro.addEventListener("click", () => {

        document.body.classList.toggle("oscuro");

        if (document.body.classList.contains("oscuro")) {

            localStorage.setItem("tema", "oscuro");

            botonOscuro.innerHTML = "☀️ Modo Claro";

        } else {

            localStorage.setItem("tema", "claro");

            botonOscuro.innerHTML = "🌙 Modo Oscuro";

        }

    });

}

//CONTROL DE SESIÓN

window.addEventListener("load", () => {

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    const usuarioLogueado =
        localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado === "true") {

        if (btnLogin) btnLogin.style.display = "none";

        if (btnRegistro) btnRegistro.style.display = "none";

        if (btnCerrarSesion)
            btnCerrarSesion.style.display = "inline-flex";

    } else {

        if (btnLogin) btnLogin.style.display = "inline-flex";

        if (btnRegistro) btnRegistro.style.display = "inline-flex";

        if (btnCerrarSesion)
            btnCerrarSesion.style.display = "none";

    }

});

//CONTROL DE ACCESO A LOS SERVICIOS

function accederServicio(pagina) {

    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado === "true") {

        window.location.href = pagina;

    } else {

        alert("⚠️ Debes Registrarte para acceder a este servicio.");

        window.location.href = "login.html";

    }

}

//CERRAR SESIÓN

function cerrarSesion() {

    const respuesta = confirm("¿Deseas cerrar la sesión?");

    if (respuesta) {

        localStorage.removeItem("usuarioLogueado");

        alert("✅ Sesión cerrada correctamente.");

        window.location.href = "index.html";

    }

}

//SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(enlace => {

    enlace.addEventListener("click", function (e) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            e.preventDefault();

            destino.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

//BUSCADOR DE SERVICIOS

const buscar = document.getElementById("buscar");

if (buscar) {

    buscar.addEventListener("keyup", () => {

        const texto = buscar.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            const contenido = card.textContent.toLowerCase();

            if (contenido.includes(texto)) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}

//BOTÓN VOLVER ARRIBA

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {

    if (!btnArriba) return;

    if (window.scrollY > 400) {

        btnArriba.style.display = "flex";

    } else {

        btnArriba.style.display = "none";

    }

});

if (btnArriba) {

    btnArriba.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

//LIGHTBOX GALERÍA

const imagenes = document.querySelectorAll(".animal img");
const lightbox = document.getElementById("lightbox");
const imagenLightbox = document.getElementById("imagenLightbox");
const cerrarLightbox = document.getElementById("cerrarLightbox");
imagenes.forEach(imagen => {

    imagen.addEventListener("click", () => {

        if (!lightbox) return;

        imagenLightbox.src = imagen.src;

        lightbox.style.display = "flex";

    });

});

if (cerrarLightbox) {

    cerrarLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}

//FORMULARIO CONTACTO

const formulario = document.getElementById("contactoForm");

if (formulario) {

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telUser = document.getElementById("telefono").value;
        const asunto = document.getElementById("asunto").value;
        const mensajeText = document.getElementById("mensaje").value;

        const telefonoDestino = "573150672371";

        const mensajeWhatsApp =
            `*Hola Family Pet, quiero realizar un contacto:*\n\n` +
            `👤 *Nombre:* ${nombre}\n` +
            `📧 *Correo:* ${correo}\n` +
            `📞 *Teléfono:* ${telUser}\n` +
            `📌 *Asunto:* ${asunto}\n` +
            `📝 *Mensaje:* ${mensajeText}`;

        const url =
            `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        window.open(url, "_blank");

        formulario.reset();

        mostrarMensaje(
            "✅ Mensaje enviado correctamente.",
            "#16a34a"
        );

    });

}

//MENSAJE EMERGENTE

function mostrarMensaje(texto, color) {

    const alerta = document.createElement("div");

    alerta.textContent = texto;

    alerta.style.position = "fixed";
    alerta.style.top = "20px";
    alerta.style.right = "20px";
    alerta.style.padding = "15px 25px";
    alerta.style.background = color;
    alerta.style.color = "#fff";
    alerta.style.borderRadius = "10px";
    alerta.style.boxShadow = "0 5px 15px rgba(0,0,0,.25)";
    alerta.style.zIndex = "99999";
    alerta.style.fontWeight = "600";

    document.body.appendChild(alerta);

    setTimeout(() => {

        alerta.remove();

    }, 3000);

}

//BOTÓN WHATSAPP
const whatsapp = document.querySelector(".whatsapp");

if (whatsapp) {
    whatsapp.addEventListener("click", (e) => {

        if (!whatsapp.getAttribute("href") || whatsapp.getAttribute("href") === "#") {

            e.preventDefault();

            const telefono = "573150672371";

            const mensaje =
                "Hola Family Pet, quiero recibir información sobre sus servicios veterinarios.";

            const url =
                "https://wa.me/" +
                telefono +
                "?text=" +
                encodeURIComponent(mensaje);

            window.open(url, "_blank");

        }

    });

}

//BARRA DE PROGRESO

const barra = document.createElement("div");

barra.style.position = "fixed";
barra.style.top = "0";
barra.style.left = "0";
barra.style.width = "0%";
barra.style.height = "4px";
barra.style.background = "#16a34a";
barra.style.zIndex = "99999";
barra.style.transition = "width .2s";

document.body.appendChild(barra);

window.addEventListener("scroll", () => {

    const altura =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progreso =
        (window.scrollY / altura) * 100;

    barra.style.width = progreso + "%";

});

//HEADER COMPACTO

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.padding = "10px 40px";

    } else {

        header.style.padding = "15px 40px";

    }

});

/*=========================================
LAZY LOAD
=========================================*/

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

/*=========================================
ANIMACIÓN TARJETAS
=========================================*/

const tarjetas = document.querySelectorAll(
    ".card, .info-card, .doctor, .comentario"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.style.opacity = "1";
            entrada.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

tarjetas.forEach(tarjeta => {

    tarjeta.style.opacity = "0";
    tarjeta.style.transform = "translateY(40px)";
    tarjeta.style.transition = "all .7s ease";

    observador.observe(tarjeta);

});

/*=========================================
VALIDACIONES
=========================================*/

window.addEventListener("error", function (e) {

    console.warn("Error detectado:", e.message);

});

/*=========================================
EFECTO BOTONES
=========================================*/
document.querySelectorAll(".btn, .btnPrincipal").forEach(boton => {

    boton.addEventListener("mouseenter", () => {

        boton.style.transform = "scale(1.05)";

    });

    boton.addEventListener("mouseleave", () => {

        boton.style.transform = "scale(1)";

    });

});

/*=========================================
EFECTO IMÁGENES
=========================================*/

document.querySelectorAll(".card img").forEach(imagen => {

    imagen.addEventListener("mouseenter", () => {

        imagen.style.transition = ".4s";
        imagen.style.transform = "scale(1.08)";

    });

    imagen.addEventListener("mouseleave", () => {

        imagen.style.transform = "scale(1)";

    });

});

/*=========================================
AÑO AUTOMÁTICO
=========================================*/

const anio = document.getElementById("anio");

if (anio) {

    anio.textContent = new Date().getFullYear();

}

/*=========================================
BIENVENIDA
=========================================*/

window.addEventListener("load", () => {

    console.log("🐾 Family Pet cargado correctamente.");

});

// =====================================
// CONTROL DE SESIÓN FAMILY PET
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

const usuario = JSON.parse(
localStorage.getItem("usuario")
);

const btnLogin =
document.getElementById("btnLogin");

const btnRegistro =
document.getElementById("btnRegistro");

const btnCerrar =
document.getElementById("btnCerrarSesion");

const usuarioActivo =
document.getElementById("usuarioActivo");

const nombreUsuario =
document.getElementById("nombreUsuario");

if(usuario){

    // Ocultar botones entrar y registro

    btnLogin.style.display="none";

    btnRegistro.style.display="none";

    // Mostrar usuario

    usuarioActivo.style.display="block";

    nombreUsuario.innerHTML =
    "Hola, " + usuario.nombre;

    // Mostrar cerrar sesión

    btnCerrar.style.display="inline-flex";

}

});

// CERRAR SESIÓN

function cerrarSesion(){

localStorage.removeItem("usuario");

window.location.href="login.html";

}

/* =========================================
   PRODUCTOS EN VENTA
========================================= */

const productos = {

    alimentos: [
        {
            nombre: "Alimento para perros",
            precio: "$45.000",
            emoji: "🐶"
        },
        {
            nombre: "Alimento para gatos",
            precio: "$38.000",
            emoji: "🐱"
        },
        {
            nombre: "Snack para mascotas",
            precio: "$15.000",
            emoji: "🦴"
        }
    ],


    accesorios: [
        {
            nombre: "Collar para perro",
            precio: "$25.000",
            emoji: "🐕"
        },
        {
            nombre: "Correa para mascota",
            precio: "$30.000",
            emoji: "🦮"
        },
        {
            nombre: "Plato para mascotas",
            precio: "$18.000",
            emoji: "🥣"
        }
    ],


    higiene: [
        {
            nombre: "Shampoo para mascotas",
            precio: "$22.000",
            emoji: "🧴"
        },
        {
            nombre: "Cepillo para mascotas",
            precio: "$17.000",
            emoji: "🪮"
        },
        {
            nombre: "Toallas húmedas",
            precio: "$12.000",
            emoji: "🧼"
        }
    ],


    juguetes: [
        {
            nombre: "Pelota para perros",
            precio: "$15.000",
            emoji: "⚽"
        },
        {
            nombre: "Juguete mordedor",
            precio: "$20.000",
            emoji: "🦴"
        },
        {
            nombre: "Ratón para gatos",
            precio: "$12.000",
            emoji: "🐭"
        }
    ],


    ropa: [
        {
            nombre: "Camiseta para mascotas",
            precio: "$28.000",
            emoji: "👕"
        },
        {
            nombre: "Abrigo para perro",
            precio: "$40.000",
            emoji: "🧥"
        },
        {
            nombre: "Disfraz para mascotas",
            precio: "$35.000",
            emoji: "🐶"
        }
    ],


    suplementos: [
        {
            nombre: "Vitaminas para mascotas",
            precio: "$32.000",
            emoji: "💊"
        },
        {
            nombre: "Suplemento nutricional",
            precio: "$45.000",
            emoji: "🧪"
        },
        {
            nombre: "Omega 3 para mascotas",
            precio: "$38.000",
            emoji: "💙"
        }
    ]

};


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(categoria) {

    const contenedor =
        document.getElementById(
            "contenedor-productos"
        );

    const botones =
        document.querySelectorAll(
            ".categoria-btn"
        );


    botones.forEach(boton => {

        boton.classList.remove("activo");

    });


    const productosCategoria =
        productos[categoria];


    if (!productosCategoria) {

        contenedor.innerHTML =
            `<p class="mensaje-productos">
                No hay productos disponibles.
            </p>`;

        return;

    }


    contenedor.innerHTML = "";


    productosCategoria.forEach(producto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "producto-card";


        tarjeta.innerHTML = `

            <div class="producto-imagen">

                ${producto.emoji}

            </div>

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                ${producto.precio}
            </p>

            <button
                type="button"
                onclick="agregarAlCarrito('${producto.nombre}')">

                🛒 Comprar

            </button>

        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================
   CARRITO
========================================= */

function agregarAlCarrito(nombre) {

    alert(
        "🛒 Producto agregado al carrito:\n\n" +
        nombre
    );

}