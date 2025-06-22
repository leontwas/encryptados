import ProductsDaoMysql from "../db/daos/products.dao.mysql.js";
import productsMock from "../db/mocks/products.mock.js";

export async function loadProductsToDb() {
  const productsDao = new ProductsDaoMysql();
  await productsDao.init();

  for (const prod of productsMock) {
    try {
      // Usamos addProduct con desestructuración para mapear campos
      await productsDao.addProduct({
        nombre_producto: prod.nombre_producto,
        categoria_id: prod.categoria_id,
        descripcion: prod.descripcion,
        precio: prod.precio,
        stock: prod.stock,
        imagen_url: prod.imagen_url,
        estado: prod.estado,
      });
      console.log(`Producto '${prod.nombre_producto}' agregado correctamente.`);
    } catch (error) {
      console.error(`Error al agregar producto '${prod.nombre_producto}':`, error);
    }
  }
}
