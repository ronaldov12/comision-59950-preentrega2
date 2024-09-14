// Espera a que el contenido del documento esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Agrego el contenedor donde se mostrarán los productos del carrito
    const carritoContenedor = document.getElementById('carrito-contenedor');
    // Agrego el elemento donde se mostrará el total de la compra
    const totalCarritoElemento = document.getElementById('total-carrito');

    // Carrito de productos desde localStorage
    const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    // Verifico si el carrito tiene productos
    if (productosEnCarrito.length > 0) {
        let totalCompra = 0; // Inicializo el total de la compra

        // Itero sobre cada producto en el carrito
        productosEnCarrito.forEach((producto, index) => { // Añadido el índice aquí
            // Creo un div para mostrar cada producto en el carrito
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto-carrito'; // Clase para aplicar estilos

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio}$</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Total: ${(producto.precio * producto.cantidad).toFixed(2)}$</p>
                <button class="eliminar-producto" data-index="${index}">Eliminar del carrito</button> 
            `;
            // Estilos en línea para el div del producto
            productoDiv.style.display = 'flex';
            productoDiv.style.flexDirection = 'column';
            productoDiv.style.alignItems = 'center';
            productoDiv.style.padding = '10px';
            productoDiv.style.borderRadius = '5px';
            productoDiv.style.backgroundColor = 'white';
            productoDiv.style.width = '270px';
            productoDiv.style.boxSizing = 'border-box';
            productoDiv.style.fontFamily = 'kanit, sans-serif';

            // Estilo para la imagen dentro del div
            const imagen = productoDiv.querySelector('img');
            imagen.style.width = '100%';
            imagen.style.height = 'auto';
            imagen.style.maxHeight = '220px';
            imagen.style.objectFit = 'cover';

            // Estilo para el botón de eliminar producto
            const botonEliminar = productoDiv.querySelector('.eliminar-producto');
            botonEliminar.style.backgroundColor = '#900C3F';
            botonEliminar.style.color = 'white';
            botonEliminar.style.border = 'none';
            botonEliminar.style.padding = '10px 20px';
            botonEliminar.style.borderRadius = '5px';
            botonEliminar.style.cursor = 'pointer';
            botonEliminar.style.fontSize = '16px';

            // Agrego el div del producto al contenedor del carrito
            carritoContenedor.appendChild(productoDiv);

            // Acumuló el total de cada producto (precio * cantidad) para calcular el total de la compra
            totalCompra += producto.precio * producto.cantidad;

            // Estilos para el contenedor del carrito
            carritoContenedor.style.display = 'flex';
            carritoContenedor.style.flexDirection = 'column';
            carritoContenedor.style.alignItems = 'center';
            carritoContenedor.style.margin = '0 auto';
            carritoContenedor.style.maxWidth = '800px';
            carritoContenedor.style.padding = '20px';
            carritoContenedor.style.boxSizing = 'border-box';
            carritoContenedor.style.gap = '20px';

        });


        // Actualizo el valor total en el DOM
        totalCarritoElemento.textContent = totalCompra.toFixed(2);

        // Cree y agregue el botón de finalizar compra
        const finalizarCompraBtn = document.createElement('button');
        finalizarCompraBtn.textContent = 'Finalizar Compra';

        // Estilos para el botón de finalizar compra
        finalizarCompraBtn.style.backgroundColor = '#28a745';
        finalizarCompraBtn.style.color = 'white';
        finalizarCompraBtn.style.border = 'none';
        finalizarCompraBtn.style.padding = '15px 22px';
        finalizarCompraBtn.style.borderRadius = '7px';
        finalizarCompraBtn.style.cursor = 'pointer';
        finalizarCompraBtn.style.fontSize = '16px';
        finalizarCompraBtn.style.marginTop = '20px';

        // Agrego un evento al botón para llamar a la función finalizarCompra cuando se hace clic
        finalizarCompraBtn.addEventListener('click', () => finalizarCompra(productosEnCarrito));
        carritoContenedor.appendChild(finalizarCompraBtn); // Agrego el botón al contenedor del carrito

        // Agregar event listeners a los botones de eliminar producto
        document.querySelectorAll('.eliminar-producto').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                eliminarProducto(index); // Llamar a la función para eliminar el producto
            });
        });
    } else {
        // Mensaje cuando el carrito está vacío
        carritoContenedor.innerHTML = `
        <p style="
        font-size: 55px;
        color: #888;
        text-align: center;
        margin-top: 20px;
        ">El carrito está vacío.</p>
`;

        // Actualiza el texto del total del carrito
        totalCarritoElemento.textContent = '0';
    }
});

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    // Recupero el carrito desde localStorage
    const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
    // Verifico si el producto en la posición dada tiene una cantidad mayor a 1
    if (productosEnCarrito[index].cantidad > 1) {
        // Disminuyo la cantidad del producto en el carrito
        productosEnCarrito[index].cantidad--;
    } else {
        // Elimino el producto si la cantidad es 1
        productosEnCarrito.splice(index, 1);
    }
    // Actualizo el carrito en localStorage
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    // Recargo la página para actualizar la vista del carrito
    location.reload(); // Recarga la página para reflejar los cambios
}

// Función para calcular el total con IVA
function calcularTotalConIva(carrito) {
    const IVA = 0.21; // Declaro una constante IVA con el valor de esta
    let total = carrito.reduce((acumulador, producto) =>
        acumulador + (producto.precio * producto.cantidad), 0);  // Sumo los precios de los productos seleccionados en el carrito 
    total = total + (total * IVA); // Le agrego el IVA al total
    return total; // Devolvemos el total como número
}

// Función para preguntar al usuario si desea pagar en cuotas
// Función para manejar el pago en cuotas o completo
function pagarEnCuotas(total) {
    Swal.fire({
        title: '¿Desea pagar en cuotas?',
        input: 'select',// Muestra un menú desplegable para seleccionar la opción
        inputOptions: {
            'no': 'No, pagar el total completo',// Opción para pagar el total de una vez
            '3': '3 cuotas',
            '6': '6 cuotas',
            '12': '12 cuotas'
        },
        inputPlaceholder: 'Seleccione una opción',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then(async (resultado) => {  // resultado contiene la respuesta del usuario a la ventana emergente
        if (resultado.isConfirmed) {// Verifico si el usuario ha confirmado la selección
            if (resultado.value === 'no') {// Si el usuario eligió pagar el total completo
                // Si elige no pagar en cuotas, realiza el pago completo
                const pagoExitoso = await simularPagoConTarjeta(total.toFixed(2));  // Llama a la función para simular el pago con tarjeta de crédito
                if (pagoExitoso) {// Si el pago fue exitoso
                    // Muestra un mensaje de éxito con SweetAlert2
                    Swal.fire({
                        title: 'Muchas gracias por la compra!',
                        text: 'Pago completo realizado exitosamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else if (['3', '6', '12'].includes(resultado.value)) {// Si el usuario eligió pagar en cuotas
                // Paga en cuotas (si seleccionó 3, 6 o 12)
                const cuotas = parseInt(resultado.value);  // Obtiene el número de cuotas seleccionadas
                const montoPorCuota = (total / cuotas).toFixed(2);// Calculo el monto a pagar por cada cuota

                // Simula el pago con tarjeta para la primera cuota
                const pagoExitoso = await simularPagoConTarjeta(montoPorCuota); // Llama a la función para simular el pago con tarjeta de crédito para la primera cuota
                if (pagoExitoso) {
                    Swal.fire({
                        title: 'Muchas gracias por la compra!',
                        text: `Pago de la primera cuota realizado exitosamente. El monto a pagar por cada cuota en ${cuotas} cuotas es: ${montoPorCuota}$`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {// Si la opción seleccionada no es válida
                Swal.fire({
                    title: 'Error!',
                    text: 'Opción no válida. Por favor seleccione una opción correcta.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    });
}
// Función para finalizar la compra
// Función para finalizar la compra
function finalizarCompra(carrito) {
    // Calculo el total con IVA
    const totalConIva = calcularTotalConIva(carrito);
    pagarEnCuotas(totalConIva);

    // Limpia el carrito después de la compra
    localStorage.removeItem('productosEnCarrito');
    // Muevo el contenedor del carrito y el total a 0
    document.getElementById('carrito-contenedor').innerHTML = `
        <p style="
        font-size: 55px;
        color: #888;
        text-align: center;
        margin-top: 20px;
        ">El carrito está vacío.</p>
    `;

    document.getElementById('total-carrito').textContent = '0';
}
