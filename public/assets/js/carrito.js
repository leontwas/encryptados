document.addEventListener('DOMContentLoaded', () => {
    // Obtener el carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Renderizar el contenido del carrito en el DOM
    function renderCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        const totalContainer = document.getElementById('total-pagar');

        if (!carritoContainer || !totalContainer) return;

        carritoContainer.innerHTML = '';
        let totalAPagar = 0;

        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            totalContainer.textContent = '0.00';
            return;
        }

        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;

            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto', 'mb-3', 'p-3', 'border', 'rounded');

            productoElemento.innerHTML = `
                <div class="d-flex align-items-center">
                    <div>
                        <h5>${producto.nombre}</h5>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Subtotal: $${subtotal.toFixed(2)}</p>
                        <button class="btn btn-danger btn-sm eliminar" data-id="${producto.id}">Eliminar</button>
                        <button class="btn btn-primary btn-sm agregar-mas" data-id="${producto.id}">Agregar Más</button>
                    </div>
                </div>
            `;

            carritoContainer.appendChild(productoElemento);
            totalAPagar += subtotal;
        });

        totalContainer.textContent = totalAPagar.toFixed(2);
    }

    // Agregar una unidad más de un producto al carrito
    function agregarMasProducto(id) {
        const producto = carrito.find(p => p.id === id);
        if (producto) {
            producto.cantidad++;
            guardarYRenderizar();
        }
    }

    // Eliminar una unidad de un producto del carrito o eliminar completamente si cantidad es 1
    function eliminarProducto(id) {
        const producto = carrito.find(p => p.id === id);
        if (producto) {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito = carrito.filter(p => p.id !== id);
            }
            guardarYRenderizar();
        }
    }

    // Guardar carrito en localStorage y renderizar cambios
    function guardarYRenderizar() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }

    // Finalizar compra
    function finalizarCompra() {
        if (carrito.length === 0) {
            alert('Su carrito está vacío. Por favor, agregue productos antes de proceder.');
            return;
        }

        const totalAPagar = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

        const productos = carrito
            .map(producto =>
                `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(
                    2
                )}, Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}`
            )
            .join('\n');

        localStorage.setItem('productos', productos);
        localStorage.setItem('total', totalAPagar.toFixed(2));

        alert(
            `El total de su compra es: $${totalAPagar.toFixed(2)}.\n\nProductos:\n${productos}\n\nPor favor, complete sus datos en el formulario.`
        );

        window.location.href = '../comprar.html';
    }

    // Eventos para botones dentro del carrito
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.addEventListener('click', event => {
        if (event.target.classList.contains('eliminar')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            eliminarProducto(id);
        } else if (event.target.classList.contains('agregar-mas')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            agregarMasProducto(id);
        }
    });

    // Evento para finalizar compra
    const finalizarBtn = document.getElementById('finalizar-btn');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            finalizarCompra();
        });
    }

    // Renderizar carrito al cargar la página
    renderCarrito();
});
