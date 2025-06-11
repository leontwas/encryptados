import { productos } from "./productosData.js";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="products">
        <div class="article">
          <img src="${producto.imagen}" class="container" alt="${producto.nombre}">
          <p class="texto-negro1">${producto.nombre}</p>
          <p class="texto-negro2">${producto.descripcion}</p>
          <p class="description">$${producto.precio.toLocaleString()}</p>
          <div class="botonera">
            <button class="agregar" data-index="${index}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>
            <button class="ver"><i class="fa-solid fa-cart-shopping" onclick="window.location.href='carrito.html'"></i></button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(card);
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
