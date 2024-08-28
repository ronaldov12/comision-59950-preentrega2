// Espera a que el contenido del documento esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // agregp el contenedor donde se mostrarán los productos del carrito
    const carritoContenedor = document.getElementById('carrito-contenedor');
    // Agrego el elemento donde se mostrará el total de la compra
    const totalCarritoElemento = document.getElementById('total-carrito');

    // carrito de productos desde localStorage
    const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    // Verifico si el carrito tiene productos
    if (productosEnCarrito.length > 0) {
        let totalCompra = 0;// Inicializo el total de la compra

        // Itero sobre cada producto en el carrito
        productosEnCarrito.forEach(producto => {
            // Creo un div para mostrar cada producto en el carrito
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto-carrito'; // Clase para aplicar estilos

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio}$</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Total: ${(producto.precio * producto.cantidad).toFixed(2)}$</p>
            `;  
            // Agrego el div del producto al contenedor del carrito
            carritoContenedor.appendChild(productoDiv);

            // Acumuló el total de cada producto (precio * cantidad) para calcular el total de la compra
            totalCompra += producto.precio * producto.cantidad ;
        });

        // Actualizo el valor total en el DOM
        totalCarritoElemento.textContent = totalCompra.toFixed(2);

        // Cree y agregue el botón de finalizar compra
        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.textContent = 'Finalizar Compra';
          // Agrego un evento al botón para llamar a la función finalizarCompra cuando se hace clic
        finalizarCompraBtn.addEventListener('click', () => finalizarCompra(productosEnCarrito));
        carritoContenedor.appendChild(finalizarCompraBtn); // Agrego el botón al contenedor del carrito
    } else {
        // Mensaje cuando el carrito está vacío
        carritoContenedor.innerHTML = '<p>El carrito está vacío.</p>';
        totalCarritoElemento.textContent = '0';
    }
});

// Función para calcular el total con IVA
function calcularTotalConIva(carrito) {
    const IVA = 0.21; // Declaro una constante IVA con el valor de esta
    let total = carrito.reduce((acumulador, producto) => 
        acumulador + (producto.precio * producto.cantidad), 0);  // Sumo los precios de los productos seleccionados en el carrito 
    total = total + (total * IVA); // Le agrego el IVA al total
    return total; // Devolvemos el total como número
}

// Función para preguntar al usuario si desea pagar en cuotas
function pagarEnCuotas(total) {
    let respuesta = prompt("¿Desea pagar en cuotas? si/no").toLowerCase();

    // Verifico si la respuesta es sí
    if (respuesta === "si") {
        let cuotas = parseInt(prompt("Elija el número de cuotas: 3, 6 o 12"));
        // Valido a cuántas cuotas desea pagar
        if (cuotas === 3 || cuotas === 6 || cuotas === 12) {
            // Calculo el monto total a cuotas
            let montoPorCuota = total / cuotas;
            alert(`El monto a pagar por cada cuota en ${cuotas} cuotas es: ${montoPorCuota.toFixed(2)}$`);
            // Llamo a la función que simula el pago con tarjeta, pasando el monto de la primera cuota
            let pagoExitoso = simularPagoConTarjeta(montoPorCuota.toFixed(2)); // Simula el pago de la primera cuota
            // Si el pago fue exitoso, muestro un mensaje de confirmación
            if (pagoExitoso) {
                alert("Pago de la primera cuota realizado exitosamente.");
            }
        } else {
            alert("Opción no válida. Elija entre 3, 6 o 12 cuotas.");
        }
    } else if (respuesta === 'no') {
        // Si el usuario elige no pagar en cuotas, se solicita el pago del total completo
        let pagoExitoso = simularPagoConTarjeta(total.toFixed(2));
          // Muestra un mensaje de éxito si el pago fue exitoso
        if (pagoExitoso) {
            alert("Pago completo realizado exitosamente.");
        }
    } else {
        alert("Opción no válida. Por favor ingrese 'si' o 'no'.");
    }
}

// Función para simular el pago con tarjeta de crédito
function simularPagoConTarjeta(montoTotal) {
    // Solicito al usuario que ingrese el número de su tarjeta de crédito
    let numeroTarjeta = prompt("Ingrese el número de su tarjeta de crédito (16 dígitos):");
    // Solicito al usuario que ingrese el código de seguridad (CVV)
    let cvv = prompt("Ingrese el código de seguridad (CVV, 3 dígitos):");
    // Solicito al usuario que ingrese la fecha de vencimiento de su tarjeta
    let vencimiento = prompt("Ingrese la fecha de vencimiento (4 dígitos):");

    // Verifico si el número de la tarjeta tiene 16 dígitos, el CVV tiene 3 dígitos, y la fecha de vencimiento tiene 4 dígitos
    if (numeroTarjeta.length === 16 && cvv.length === 3 && vencimiento.length === 4) {
        // Si los datos son correctos, muestro un mensaje de éxito y confirmo que el pago se ha realizado
        alert(`Pago exitoso. Se ha debitado ${montoTotal}$ de su tarjeta.`);
        return true; // Devuelvo true para indicar que el pago fue exitoso
    } else {
        alert("Error en el pago. Verifique los datos e inténtelo de nuevo.");
        return false;
    }
}

// Función para finalizar la compra
function finalizarCompra(carrito) {
     // Calculo el total con IVA
    const totalConIva = calcularTotalConIva(carrito);
    pagarEnCuotas(totalConIva);


    // Limpia el carrito después de la compra
    localStorage.removeItem('productosEnCarrito');
     // Muevo el contenedor del carrito y el total a 0
    document.getElementById('carrito-contenedor').innerHTML = '<p>El carrito está vacío.</p>';
    document.getElementById('total-carrito').textContent = '0';
}

finalizarCompra();