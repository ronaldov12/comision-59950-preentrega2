// Defino un array de productos con sus respectivas propiedades: id, nombre y precio
const productos = [
    { id: 1, nombre: "Reloj Tommy Hilfiger", precio: 359, imagen: 'img/hollyfinger.webp' },
    { id: 2, nombre: "Reloj Tissot Everytime Gent", precio: 549, imagen: 'img/relojtissot.webp' },
    { id: 3, nombre: "Reloj Tissot Seastar", precio: 764, imagen: 'img/relojtissotseastar.webp' },
    { id: 4, nombre: "Reloj Swatch Ashbayang", precio: 130, imagen: 'img/swatchAshbayang.webp' },
];


// agrego todos los botones para agregar productos al carrito
let botonAgregarAlCarrito = document.querySelectorAll(".agregarProductoAlCarrito");
// agrego el id que muestra el número de productos en el carrito
const numeroDeBolso = document.querySelector("#numeroDeBolso")


// Función para mostrar los productos disponibles en la pagina
function mostrarProductos() {
    // agrego el id contenedor donde se muestran los productos
    const productosContainer = document.getElementById('productos-contenedor');
    productosContainer.innerHTML = ""; // Limpio cualquier contenido previo

    productos.forEach(producto => {
        // Creo un elemento div para cada producto
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto'; // Le agrego una clase para aplicar estilos 

        // Creo un contenido para el producto con su nombre y precio
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}"></a>
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.precio}$</p>
            <button class="agregarProductoAlCarrito" id="${producto.id}">Agregar al carrito</button>
            `;

        // Agrego el producto al contenedor de productos
        productosContainer.appendChild(productoDiv);
    });

    actualizarBotonAgregar();
    console.log(botonAgregarAlCarrito);
}

// Inicializa la visualización de productos
mostrarProductos();
// Actualizo los botones de agregar al carrito con eventos
function actualizarBotonAgregar() {
    botonAgregarAlCarrito = document.querySelectorAll(".agregarProductoAlCarrito");

    botonAgregarAlCarrito.forEach(boton => {
        // Agrego el EventListener a cada botón individualmente
        boton.addEventListener("click", agregarAlCarrito);
    });
}


// Obtengo el carrito de productos del localStorage o inicializo uno vacío si no existe
let carrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(evento) {

    const idIngresado = Number(evento.currentTarget.id);  // Capturo el id del botón clicado y lo convierto a número
    // Encuentro el producto en el array de productos correspondiente al id clicado
    const productoAgregado = productos.find(producto => producto.id === idIngresado);

    if (carrito.some(producto => producto.id === idIngresado)) {// Verifico si el producto ya está en el carrito
        // Si el producto ya está en el carrito, incremento su cantidad
        const index = carrito.findIndex(producto => producto.id === idIngresado);
        carrito[index].cantidad++;
    } else {
        // Si el producto no está en el carrito, lo agrego con cantidad 1
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    // Actualizo el número de productos en el carrito
    actualizarNumeroDeBolso();
    // Guardo el carrito actualizado en el localStorage
    localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
}

// Función para actualizar el número de productos en el carrito
function actualizarNumeroDeBolso() {
    // Calculo el número total de productos en el carrito sumando las cantidades de cada producto
    let nuevoNumeroDeBolso = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    // Actualizo el contenido del elemento que muestra el número de productos en el carrito
    numeroDeBolso.innerText = nuevoNumeroDeBolso;
}


actualizarNumeroDeBolso();