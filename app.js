import mysql from "mysql2/promise";
import config from "./db/config/mysql.config.js";
import Server from "./server/Server.js";
import UsersDaoMysql from "./db/daos/users.dao.mysql.js";
import ProductsDaoMysql from "./db/daos/products.dao.mysql.js";
import DetallesDaoMysql from "./db/daos/detalles.dao.mysql.js";
import OrdenesDaoMysql from "./db/daos/ordenes.dao.mysql.js";
import PagosDaoMysql from "./db/daos/pagos.dao.mysql.js";
import CategoriasDaoMysql from "./db/daos/categorias.dao.mysql.js";
import DireccionesDaoMysql from "./db/daos/direcciones.dao.mysql.js";
import Mysql from "./db/connections/Mysql.js";

// Seeders
import { loadUsersToDb } from "./seeders/users.seeder.js";
import { loadCategoriasToDb } from "./seeders/categorias.seeder.js";
import { loadProductsToDb } from "./seeders/products.seeder.js";
import { loadDireccionesToDb } from "./seeders/direcciones.seeder.js";
import { loadOrdenesToDb } from "./seeders/ordenes.seeder.js";
import { loadPagosToDb } from "./seeders/pagos.seeder.js";
import { loadDetallesToDb } from "./seeders/detalles.seeder.js";

// Verifica si ya hay datos cargados en la base (por ejemplo en la tabla 'usuario')
async function checkDatabaseHasData() {
  const db = new Mysql();
  await db.initialize();

  try {
    const [rows] = await db.connection.query("SELECT COUNT(*) AS total FROM usuario");
    return rows[0].total > 0;
  } catch (error) {
    console.error("❌ Error al verificar datos existentes:", error);
    return false;
  }
}

// Función para cargar datos con control de errores
async function safeLoad(fn, name) {
  try {
    await fn();
    console.log(`✅ ${name} cargados correctamente`);
  } catch (error) {
    console.error(`❌ Error al cargar ${name}:`, error);
  }
}

// Función principal
async function main() {
  // 1. Crear base de datos y conectar
  const db = new Mysql();
  await db.initialize();

  // 2. Crear DAOs e inicializar tablas
  const categoriasDao = new CategoriasDaoMysql(); await categoriasDao.init();
  const usersDao = new UsersDaoMysql(); await usersDao.init();
  const productsDao = new ProductsDaoMysql(); await productsDao.init();
  const direccionesDao = new DireccionesDaoMysql(); await direccionesDao.init();
  const ordenesDao = new OrdenesDaoMysql(); await ordenesDao.init();
  const pagosDao = new PagosDaoMysql(); await pagosDao.init();
  const detallesDao = new DetallesDaoMysql(); await detallesDao.init();

  // 3. Verificar si ya hay datos cargados
  const dbHasData = await checkDatabaseHasData();

  if (!dbHasData) {
    await safeLoad(loadCategoriasToDb, "Categorías");
    await safeLoad(loadProductsToDb, "Productos");
    await safeLoad(loadUsersToDb, "Usuarios");
    await safeLoad(loadDireccionesToDb, "Direcciones");
    await safeLoad(loadOrdenesToDb, "Órdenes");
    await safeLoad(loadDetallesToDb, "Detalles");
    await safeLoad(loadPagosToDb, "Pagos");
  } else {
    console.log("⚠️ La base de datos ya tiene datos. Carga omitida.");
  }

  // 4. Iniciar servidor
  Server.run(process.env.PORT || 8080);
}

await main();
