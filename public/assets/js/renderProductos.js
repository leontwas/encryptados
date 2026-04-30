import { productos } from "./productosData.js";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  productos.forEach((producto, index) => {
    const article = document.createElement("div");
    article.classList.add("article");
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
              <button class="agregar" data-index="${index}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
              <button class="ver" onclick="window.location.href='carrito.html'"><i class="fas fa-shopping-cart"></i></button>
            </div>
          </div>
    `;
    productList.appendChild(article);
  });

  const botonesAgregar = document.querySelectorAll(".agregar");

  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const producto = productos[index];

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
          cantidad: 1,
        });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
});
