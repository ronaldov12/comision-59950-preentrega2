
let productos = []; 

fetch("js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    });

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
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: auto;">
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.precio}$</p>
            <button class="agregarProductoAlCarrito" id="${producto.id}">Agregar al carrito</button>
        `;


        productoDiv.style.display = 'flex';
        productoDiv.style.flexDirection = 'column';
        productoDiv.style.alignItems = 'center';
        productoDiv.style.padding = '10px';
        productoDiv.style.borderRadius = '5px';
        productoDiv.style.backgroundColor = ' white ';
        productoDiv.style.width = '280px'; 
        productoDiv.style.boxSizing = 'border-box';
        productoDiv.style.fontFamily = 'kanit, sans-serif'; 

        // Agrego el producto al contenedor de productos
        const botonAgregar = productoDiv.querySelector('.agregarProductoAlCarrito');
        botonAgregar.style.backgroundColor = '#900C3F '; 
        botonAgregar.style.color = 'white'; 
        botonAgregar.style.border = 'none'; 
        botonAgregar.style.padding = '10px 20px';
        botonAgregar.style.borderRadius = '5px'; 
        botonAgregar.style.cursor = 'pointer'; 
        botonAgregar.style.fontSize = '16px'; 

        productosContainer.appendChild(productoDiv);
    });

    productosContainer.style.display = 'flex';
    productosContainer.style.flexWrap = 'wrap';
    productosContainer.style.justifyContent = 'center'; 
    productosContainer.style.gap = '100px';

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

    // Mostrar notificación con Toastify
    Toastify({
        text: `¡${productoAgregado.nombre} fue agregado al Bolso!`,
        duration: 3000, 
        close: true, 
        gravity: "top", 
        position: "right", 
        backgroundColor: "#900C3F", 
        stopOnFocus: true 
    }).showToast();
}

// Función para actualizar el número de productos en el carrito
function actualizarNumeroDeBolso() {
    // Calculo el número total de productos en el carrito sumando las cantidades de cada producto
    let nuevoNumeroDeBolso = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    // Actualizo el contenido del elemento que muestra el número de productos en el carrito
    numeroDeBolso.innerText = nuevoNumeroDeBolso;

    numeroDeBolso.style.color = "#ffffff";  
    numeroDeBolso.style.fontWeight = "bold";  
    numeroDeBolso.style.fontSize = "20px"; 
    numeroDeBolso.style.textDecoration = "none";  
    numeroDeBolso.style.listStyle = "none"; 

}


actualizarNumeroDeBolso();