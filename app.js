import Server from "./server/Server.js";
import UsersDaoMysql from "./db/daos/users.dao.mysql.js";
import ProductsDaoMysql from "./db/daos/products.dao.mysql.js";
import DetallesDaoMysql from "./db/daos/detalles.dao.mysql.js";
import OrdenesDaoMysql from "./db/daos/ordenes.dao.mysql.js";
import PagosDaoMysql from "./db/daos/pagos.dao.mysql.js";
import CategoriasDaoMysql from "./db/daos/categorias.dao.mysql.js";
import DireccionesDaoMysql from "./db/daos/direcciones.dao.mysql.js";
import Mysql from "./db/connections/Mysql.js";
// Importar seeders
import { loadUsersToDb } from "./seeders/users.seeder.js";
import { loadCategoriasToDb } from "./seeders/categorias.seeder.js";  
import { loadProductsToDb } from "./seeders/products.seeder.js";
import { loadDireccionesToDb } from "./seeders/direcciones.seeder.js";
import { loadOrdenesToDb } from "./seeders/ordenes.seeder.js";
import { loadPagosToDb } from "./seeders/pagos.seeder.js";
import { loadDetallesToDb } from "./seeders/detalles.seeder.js";

// 1. Crear base de datos y conectar
const db = new Mysql();
await db.initialize();

// 2. Crear DAO e inicializar conexión + tablas
const categoriasDao = new CategoriasDaoMysql();
await categoriasDao.init();

const usersDao = new UsersDaoMysql();
await usersDao.init();

const productsDao = new ProductsDaoMysql();
await productsDao.init();

const direccionesDao = new DireccionesDaoMysql();
await direccionesDao.init();

const ordenesDao = new OrdenesDaoMysql();
await ordenesDao.init();

const pagosDao = new PagosDaoMysql();
await pagosDao.init();

const detallesDao = new DetallesDaoMysql();
await detallesDao.init();


// 3. Iniciar servidor
Server.run(process.env.PORT || 8080);

// 4. Sembrar la base de datos
async function safeLoad(fn, name) {
  try {
    await fn();
    console.log(`✅ ${name} cargados correctamente`);
  } catch (error) {
    console.error(`❌ Error al cargar ${name}:`, error);
  }
}
/*
await safeLoad(loadCategoriasToDb, "Categorías");
await safeLoad(loadProductsToDb, "Productos");
await safeLoad(loadUsersToDb, "Usuarios");
await safeLoad(loadDireccionesToDb, "Direcciones");
await safeLoad(loadOrdenesToDb, "Órdenes");
await safeLoad(loadDetallesToDb, "Detalles");
await safeLoad(loadPagosToDb, "Pagos");
*/

