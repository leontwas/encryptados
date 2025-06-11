// Array inicial de productos
let productos = [
    { nombre: "Chalecos Refractarios", precio: 5000, imagen: "./assets/images/chaleco.png" },
    { nombre: "Cascos de seguridad", precio: 10000, imagen: "./assets/images/cascos.png" },
    { nombre: "Libro del Lic. Altamirano", precio: 55000, imagen: "./assets/images/libro3D.png" },
    { nombre: "Arnés de seguridad", precio: 100000, imagen: "./assets/images/arnes.png" },
    { nombre: "Protectores Auditivos", precio: 16000, imagen: "./assets/images/auriculares.png" },
    { nombre: "Protectores Visuales", precio: 3000, imagen: "./assets/images/lentes.png" },
    { nombre: "Guantes de seguridad", precio: 4000, imagen: "./assets/images/guantes.png" },
    { nombre: "Borcegos con punta de acero", precio: 70000, imagen: "./assets/images/borcegos.png" }
];

// Función para renderizar los productos en la página
function renderizarProductos() {
    const contenedorProductos = document.getElementById("products-container");
    contenedorProductos.innerHTML = ""; // Limpia los productos existentes

    productos.forEach((producto, index) => {
        const productoHTML = `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" />
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                <button onclick="editarProducto(${index})">Editar</button>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
}

// Evento para manejar el formulario de agregar producto
document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const nombre = document.getElementById("product-name").value;
    const precio = parseFloat(document.getElementById("product-price").value);
    const imagen = document.getElementById("product-image").value;

    if (nombre && precio && imagen) {
        productos.push({ nombre, precio, imagen });
        renderizarProductos();
        e.target.reset(); // Limpia el formulario después de agregar el producto
    } else {
        alert("Por favor, complete todos los campos del formulario.");
    }
});

// Función para eliminar un producto por su índice
function eliminarProducto(index) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmacion) {
        productos.splice(index, 1); // Elimina el producto del array
        renderizarProductos(); // Actualiza los productos en la página
    }
}

// Función para editar un producto
function editarProducto(index) {
    const producto = productos[index];

    const nuevoNombre = prompt("Editar Nombre:", producto.nombre);
    const nuevoPrecio = parseFloat(prompt("Editar Precio:", producto.precio));
    const nuevaImagen = prompt("Editar URL de Imagen:", producto.imagen);

    if (nuevoNombre && nuevoPrecio && nuevaImagen) {
        productos[index] = { nombre: nuevoNombre, precio: nuevoPrecio, imagen: nuevaImagen };
        renderizarProductos(); // Actualiza los productos en la página
    } else {
        alert("Todos los campos son obligatorios para editar el producto.");
    }
}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
});
