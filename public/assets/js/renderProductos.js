import { productos } from "./productosData.js";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const modal = document.getElementById("product-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalBackBtn = document.getElementById("modal-back");
  const modalAddToCartBtn = document.getElementById("modal-add-to-cart");

  // Renderizar productos
  productos.forEach((producto, index) => {
    const article = document.createElement("div");
    article.classList.add("article");
    article.style.cursor = "pointer"; // Indica que es clickable
    
    article.innerHTML = `
          <div class="img-container">
            <img src="${producto.imagen}" alt="${producto.nombre}">
          </div>
          <div class="info-container">
            <p class="texto-negro1">${producto.nombre}</p>
            <p class="texto-negro2">${producto.descripcion}</p>
          </div>
          <div class="footer-container">
            <p class="description">$${producto.precio.toLocaleString()}</p>
            <div class="botonera">
              <button class="agregar" data-index="${index}" onclick="event.stopPropagation()">Comprar</button>
              <button class="ver" onclick="event.stopPropagation(); window.location.href='carrito.html'"><i class="fas fa-shopping-cart"></i></button>
            </div>
          </div>
    `;

    // Evento para abrir el modal al hacer click en la tarjeta (pero no en los botones)
    article.addEventListener("click", () => {
        openModal(producto, index);
    });

    productList.appendChild(article);
  });

  // Función para abrir el modal
  function openModal(producto, index) {
      document.getElementById("modal-title").textContent = producto.nombre;
      document.getElementById("modal-img").src = producto.imagen;
      document.getElementById("modal-description").textContent = producto.descripcion;
      document.getElementById("modal-price").textContent = `$${producto.precio.toLocaleString()}`;
      
      // Configurar el botón de agregar al carrito del modal
      modalAddToCartBtn.onclick = () => {
          agregarAlCarrito(producto);
          closeModal();
      };

      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Evita scroll al fondo
  }

  // Función para cerrar el modal
  function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
  }

  closeModalBtn.addEventListener("click", closeModal);
  modalBackBtn.addEventListener("click", closeModal);

  // Cerrar modal al hacer click fuera del contenido
  modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
  });

  // Lógica de agregar al carrito (compartida)
  function agregarAlCarrito(producto) {
      Swal.fire({
        title: "Producto agregado al carrito",
        text: `"${producto.nombre}" fue agregado con éxito.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const productoExistente = carrito.find((item) => item.nombre === producto.nombre);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1,
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Asignar eventos a los botones de las tarjetas originales
  productList.addEventListener("click", (e) => {
      if (e.target.classList.contains("agregar")) {
          const index = e.target.dataset.index;
          agregarAlCarrito(productos[index]);
      }
  });
});
