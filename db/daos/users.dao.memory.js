import usersMock from '../mocks/users.mock.js'


export default class UsersDaoMemory {
  constructor() {
    this.users = usersMock;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    const user = this.users.find((user) => user.id_usuario === parseInt(id));
    return user;
  }

  getUsersByName(name) {
    const result = this.users.filter((user) =>
      user.nombre_usuario.toLowerCase().includes(name.toLowerCase())
    );
    return result;
  }

  addUser(user) {
    this.users.push(user);
    return true;
  }

updateUser(data) {
  let modifiedUser = null;
  this.users = this.users.map((user) => {
    if (user.id_usuario === data.id_usuario) {
      modifiedUser = data;
      return data; 
    }
    return user; 
  });
  return modifiedUser;
}


deleteUser(id) {
  const idNum = parseInt(id);
  const found = this.users.some((user) => user.id_usuario === idNum);
  if (found) {
    this.users = this.users.filter((user) => user.id_usuario !== idNum);
  }
  return found;
}

}