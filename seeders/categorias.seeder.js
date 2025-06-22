import CategoriasDaoMysql from "../db/daos/categorias.dao.mysql.js";
import categoriasMock from "../db/mocks/categorias.mock.js";

export async function loadCategoriasToDb() {
  const categoriasDao = new CategoriasDaoMysql();
  await categoriasDao.init();

  for (const cat of categoriasMock) {
    try {
      await categoriasDao.addCategoria({
        nombre_categoria: cat.nombre_categoria,
      });
      console.log(`Categoría '${cat.nombre_categoria}' agregada correctamente.`);
    } catch (error) {
      console.error(`Error al agregar categoría '${cat.nombre_categoria}':`, error);
    }
  }
}

