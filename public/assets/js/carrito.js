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

            // --- Lógica mejorada para la imagen ---
            // Si el producto no tiene imagen, intentamos buscarla en la data maestra
            let imgSrc = producto.imagen;
            
            // Si no tiene imagen guardada en localStorage, intentamos recuperarla
            if (!imgSrc) {
                // Importante: Esto requiere que productos esté disponible o lo buscamos de otra forma
                // Por ahora usamos un fallback más seguro
                imgSrc = `./assets/images/img${producto.id}.png`; 
            }

            productoElemento.innerHTML = `
                <div class="row align-items-center g-3">
                    <div class="col-4 col-sm-3 col-md-2">
                        <div class="img-cart-container" style="background: #fff; border: 1px solid #eee; border-radius: 8px; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0 auto;">
                            <img src="${imgSrc}" 
                                 alt="${producto.nombre}" 
                                 onerror="this.src='./assets/images/logo.png'"
                                 style="width: 100%; height: 100%; object-fit: contain; padding: 5px;">
                        </div>
                    </div>
                    <div class="col-8 col-sm-9 col-md-10">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="info-cart">
                                <h5 class="mb-1" style="font-size: 1.1rem; color: #333; font-weight: 600;">${producto.nombre}</h5>
                                <p class="mb-0 text-muted small">Unitario: $${producto.precio.toLocaleString()}</p>
                                <p class="mb-0">Cant: <strong>${producto.cantidad}</strong></p>
                                <p class="mb-0">Subtotal: <strong style="color: #0056b3;">$${subtotal.toLocaleString()}</strong></p>
                            </div>
                            <div class="btn-group" style="gap: 2px;">
                                <button class="btn btn-primary agregar-mas" data-id="${producto.id}" style="width: 38px !important; height: 38px !important; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 4px; padding: 0;">+</button>
                                <button class="btn btn-danger eliminar" data-id="${producto.id}" style="width: 38px !important; height: 38px !important; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 4px; padding: 0;">-</button>
                            </div>
                        </div>
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
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Por favor, agregue productos antes de proceder.'
        });
        return;
    }

    const totalAPagar = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    const productos = carrito
        .map(producto =>
            `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}, Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}`
        )
        .join('<br>');

    localStorage.setItem('productos', productos);
    localStorage.setItem('total', totalAPagar.toFixed(2));

    Swal.fire({
        title: 'Compra finalizada',
        html: `El total de su compra es: <strong>$${totalAPagar.toFixed(2)}</strong><br><br><strong>Productos:</strong><br>${productos}<br><br>Será redirigido para completar sus datos.`,
        icon: 'success',
        confirmButtonText: 'Continuar'
    }).then(() => {
        window.location.href = '../comprar.html';
    });
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
