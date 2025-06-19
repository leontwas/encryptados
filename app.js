import Server from "./server/Server.js";
import UsersDaoMysql from "./db/daos/users.dao.mysql.js";
import ProductsDaoMysql from "./db/daos/products.dao.mysql.js";
Server.run(process.env.PORT || 8080)

/*
// Instancio un objeto de la clase ProductsDaoMysql
const newProd = new ProductsDaoMysql();

// Creo un producto para agregarlo a la base de datos
const product =  {
    nombre_producto: "Mouse Noga",
    categoria_id: 4,
    descripcion: "Mouse Noga, sensor óptico de 7200 Dpi, Iluminación RGB",
    precio: 15000,
    stock: 10,
    imagen_url: "./assets/images/img2.png",
  }

// Agrego el usuario a la base de datos llamando al método addUser
newProd.addProduct(product);
*/