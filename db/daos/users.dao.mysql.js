import Mysql from '../connections/Mysql.js';


export default class UsersDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "usuario";
    this.#createTable();
  }

  #createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
        id_usuario int(11) NOT NULL,
        nombre_usuario varchar(50) NOT NULL COMMENT 'nombre completo',
        email varchar(50) NOT NULL,
        pass varchar(100) NOT NULL COMMENT 'Guarda el hash, no el texto'
)`;

    this.connection.query(query);
  }

  async getAllUsers() {
    try {
      const query = `SELECT * FROM ${this.table}`;
      const [result] = await this.connection.promise().query(query);
      return result;
    } catch (err) {
      console.log("Problemas al obtener los usuarios");
      return [];
    }
  }

  async getUserById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id_usuario = ?`;
    const [result] = await this.connection.promise().query(query, [id]);
    return result;
  }

async getUsersByName(nombre_usuario) {
    const palabras = nombre_usuario.trim().split(/\s+/);
    const conditions = palabras.map(() => `LOWER(nombre_usuario) LIKE ? COLLATE utf8mb4_general_ci`).join(" OR ");
    const values = palabras.map(p => `%${p.toLowerCase()}%`);
    const query = `SELECT * FROM ${this.table} WHERE ${conditions}`;
    const [result] = await this.connection.promise().query(query, values);
    return result;
}

  async addUser(user) {
    const { id_usuario, nombre_usuario, email, pass } = user;
    const query = `INSERT INTO ${this.table} VALUES (?,?,?,?)`;
    const [result] = await this.connection
      .promise()
      .query(query, [id_usuario, nombre_usuario, email, pass]);
    return result;
  }

  async modifyUser(user) {
    const { id_usuario, nombre_usuario, email, pass } = user;
    const query = `UPDATE ${this.table} SET nombre_usuario = ?, email = ?, pass = ? WHERE id_usuario = ?`;
    const [result] = await this.connection
      .promise()
      .query(query, [nombre_usuario, email, pass, id_usuario]);
    return result;
  }

  async deleteUser(id_usuario) {
    const query = `DELETE FROM ${this.table} WHERE id_usuario = ${id_usuario}`;
    const [result] = await this.connection.promise().query(query);
    return result;
  }
}