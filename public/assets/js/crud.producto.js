document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const id_producto = document.getElementById("id_producto");
  const nombre_producto = document.getElementById("nombre_producto");
  const categoria_id = document.getElementById("categoria_id");
  const descripcion = document.getElementById("descripcion");
  const precio = document.getElementById("precio");
  const stock = document.getElementById("stock");
  const imagen_url = document.getElementById("imagen_url");
  const estado = document.getElementById("estado");
  const mensajeDiv = document.getElementById("mensaje");

  const [btnLimpiar, btnAgregar, btnModificar, btnEliminar, btnBuscarNombre, btnBuscarID] = form.querySelectorAll("button");

  function mostrarMensaje(texto, tipo = "success", duracion = 4000) {
    mensajeDiv.innerHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${texto}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;

    setTimeout(() => {
      const alerta = bootstrap.Alert.getOrCreateInstance(mensajeDiv.querySelector(".alert"));
      alerta.close();
    }, duracion);
  }

  function getFormData() {
    return {
      id_producto: parseInt(id_producto.value),
      nombre_producto: nombre_producto.value.trim(),
      categoria_id: parseInt(categoria_id.value),
      descripcion: descripcion.value.trim(),
      precio: parseFloat(precio.value),
      stock: parseInt(stock.value),
      imagen_url: imagen_url.value.trim(),
      estado: parseInt(estado.value)
    };
  }

  function validarProducto(producto) {
    const camposFaltantes = [];
    for (const [key, value] of Object.entries(producto)) {
      if (value === "" || value === null || Number.isNaN(value)) {
        camposFaltantes.push(key);
      }
    }
    return camposFaltantes;
  }

  btnLimpiar.addEventListener("click", () => {
    form.reset();
    mostrarMensaje("Formulario limpiado.", "info");
  });

  btnAgregar.addEventListener("click", async () => {
    const producto = getFormData();
    const faltantes = validarProducto(producto);

    if (faltantes.length > 0) {
      mostrarMensaje("Faltan los siguientes campos: " + faltantes.join(", "), "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });

      if (!response.ok) throw new Error("Error al agregar producto");
      const data = await response.json();
      mostrarMensaje("Producto agregado correctamente.", "success");
      console.log(data);
    } catch (error) {
      mostrarMensaje("Error al agregar producto.", "danger");
      console.error(error);
    }
  });

  btnModificar.addEventListener("click", async () => {
    const producto = getFormData();
    if (!producto.id_producto) {
      mostrarMensaje("Debe ingresar el ID del producto a modificar.", "warning");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${producto.id_producto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
      });

      if (!response.ok) throw new Error("Error al modificar producto");
      const data = await response.json();
      mostrarMensaje("Producto modificado correctamente.", "success");
      console.log(data);
    } catch (error) {
      mostrarMensaje("Error al modificar el producto.", "danger");
      console.error(error);
    }
  });

  btnEliminar.addEventListener("click", async () => {
    const id = parseInt(id_producto.value);
    if (!id) {
      mostrarMensaje("Debe ingresar el ID del producto a eliminar.", "warning");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        mostrarMensaje("Producto eliminado correctamente.", "success");
        form.reset();
      } else {
        mostrarMensaje("No se pudo eliminar el producto.", "danger");
      }
    } catch (error) {
      mostrarMensaje("Error al eliminar el producto.", "danger");
      console.error(error);
    }
  });

  btnBuscarNombre.addEventListener("click", async () => {
    const nombre = nombre_producto.value.trim();
    if (!nombre) {
      mostrarMensaje("Debe ingresar un nombre de producto.", "warning");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/search?nombre_producto=${encodeURIComponent(nombre)}`);
      if (!response.ok) throw new Error("Producto no encontrado");
      const data = await response.json();

      if (data.length > 0) {
        cargarProductoEnFormulario(data[0]);
        mostrarMensaje("Producto encontrado.", "success");
      } else {
        mostrarMensaje("No se encontró un producto con ese nombre.", "info");
      }
    } catch (error) {
      mostrarMensaje("Error al buscar el producto.", "danger");
      console.error(error);
    }
  });

  btnBuscarID.addEventListener("click", async () => {
    const id = parseInt(id_producto.value);
    if (!id) {
      mostrarMensaje("Debe ingresar un ID.", "warning");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      if (!response.ok) throw new Error("Producto no encontrado");
      const data = await response.json();

      cargarProductoEnFormulario(data);
      mostrarMensaje("Producto encontrado.", "success");
    } catch (error) {
      mostrarMensaje("Error al buscar producto por ID.", "danger");
      console.error(error);
    }
  });

  function cargarProductoEnFormulario(producto) {
    id_producto.value = producto.id_producto;
    nombre_producto.value = producto.nombre_producto;
    categoria_id.value = producto.categoria_id;
    descripcion.value = producto.descripcion;
    precio.value = producto.precio;
    stock.value = producto.stock;
    imagen_url.value = producto.imagen_url;
    estado.value = producto.estado;
  }
});
