import Server from "./server/Server.js";
import UsersDaoMysql from "./db/daos/users.dao.mysql.js";
import ProductsDaoMysql from "./db/daos/products.dao.mysql.js";
import DetallesDaoMysql from "./db/daos/detalles.dao.mysql.js";
import OrdenesDaoMysql from "./db/daos/ordenes.dao.mysql.js";
import Mysql from "./db/connections/Mysql.js";

// 1. Crear base de datos y conectar
const db = new Mysql();
await db.initialize();

// 2. Crear DAO e inicializar conexión + tablas
const usersDao = new UsersDaoMysql();
await usersDao.init();

const productsDao = new ProductsDaoMysql();
await productsDao.init()

const detallesDao = new DetallesDaoMysql();
await detallesDao.init();

const ordenesDao = new OrdenesDaoMysql();
await ordenesDao.init();

// 3. Iniciar servidor
Server.run(process.env.PORT || 8080);

// 4. (Opcional) prueba para agregar producto
/*
const product = {
  nombre_producto: "Mouse Noga",
  categoria_id: 4,
  descripcion: "Mouse Noga, sensor óptico de 7200 Dpi, Iluminación RGB",
  precio: 15000,
  stock: 10,
  imagen_url: "./assets/images/img2.png",
  estado: 1
};

await productsDao.addProduct(product);
*/
