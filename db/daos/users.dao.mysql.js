import Mysql from '../connections/Mysql.js';

export default class UsersDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = 'usuario';
    this.init();
  }

  async init() {
    await this.connect(); // Asegura conexión antes de crear tabla
    await this.#createTable();
  }

  async #createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nombre_usuario VARCHAR(50) NOT NULL COMMENT 'nombre completo',
        email VARCHAR(50) NOT NULL UNIQUE,
        pass VARCHAR(100) NOT NULL COMMENT 'Guarda el hash, no el texto'
      )
    `;
    await this.execute(query); // Usamos execute() público en vez de this.connection.execute
  }

  async getAllUsers() {
    const rows = await this.execute(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async getUserById(id_usuario) {
    const rows = await this.execute(
      `SELECT * FROM ${this.table} WHERE id_usuario = ?`,
      [id_usuario]
    );
    return rows[0];
  }

  async getUsersByName(nombre_usuario) {
    const palabras = nombre_usuario.trim().split(/\s+/);
    const conditions = palabras.map(() => `LOWER(nombre_usuario) LIKE ?`).join(' OR ');
    const values = palabras.map(p => `%${p.toLowerCase()}%`);
    const query = `SELECT * FROM ${this.table} WHERE ${conditions}`;
    const rows = await this.execute(query, values);
    return rows;
  }

  async addUser({ nombre_usuario, email, pass }) {
    const sql = `INSERT INTO ${this.table} (nombre_usuario, email, pass) VALUES (?, ?, ?)`;
    const result = await this.execute(sql, [nombre_usuario, email, pass]);
    return result;
  }

  async modifyUser({ id_usuario, nombre_usuario, email, pass }) {
    const sql = `UPDATE ${this.table} SET nombre_usuario = ?, email = ?, pass = ? WHERE id_usuario = ?`;
    const result = await this.execute(sql, [nombre_usuario, email, pass, id_usuario]);
    return result;
  }

  async deleteUser(id_usuario) {
    const sql = `DELETE FROM ${this.table} WHERE id_usuario = ?`;
    const result = await this.execute(sql, [id_usuario]);
    return result;
  }
}
