import UsersDaoMysql from "../db/daos/users.dao.mysql.js";
import usersMock from "../db/mocks/users.mock.js";

export async function loadUsersToDb() {
  const usersDao = new UsersDaoMysql();
  await usersDao.init();

  for (const user of usersMock) {
    try {
      await usersDao.addUser({
        nombre_usuario: user.nombre_usuario,
        email: user.email,
        pass: user.pass,
      });
      console.log(`Usuario '${user.nombre_usuario}' agregado correctamente.`);
    } catch (error) {
      console.error(`Error al agregar usuario '${user.nombre_usuario}':`, error);
    }
  }
}
