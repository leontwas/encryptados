import Server from "./server/Server.js";
import UsersDaoMysql from "./db/daos/users.dao.mysql.js";
import ProductsDaoMysql from "./db/daos/products.dao.mysql.js";
Server.run(process.env.PORT || 8080)


// Instancio un objeto de la clase UsersDaoMysql
const newProd = new ProductsDaoMysql();
/*
// Creo un usuario para agregarlo a la base de datos
const user =  {
    id_usuario: 12,
    nombre_usuario: "Ricardo Soler",
    email: "wsoler@yahoo.com",
    pass: "hjrefl3452"
  }

// Agrego el usuario a la base de datos llamando al método addUser
newUser.updateUser(user);
*/
newProd.deleteProduct(14);