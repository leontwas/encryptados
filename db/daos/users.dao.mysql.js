import Mysql from "../connections/Mysql.js";

export default class UsersDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "usuario";
  }

  async init() {
    await this.initialize(); // ✅ Siempre asegura conexión antes de crear tabla
    await this.#createTable();
  }

  async #createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id_usuario INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre_usuario VARCHAR(50) NOT NULL COMMENT 'Nombre completo del usuario',
        email VARCHAR(50) NOT NULL UNIQUE COMMENT 'Correo electrónico único',
        pass VARCHAR(100) NOT NULL COMMENT 'Hash de la contraseña (no texto plano)',
        estado TINYINT(1) DEFAULT 1 COMMENT '1: activo, 0: inactivo'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    try {
      await this.execute(query);
      console.log(`✅ Tabla '${this.table}' creada o verificada correctamente`);
    } catch (error) {
      console.error(`❌ Error al crear tabla '${this.table}':`, error);
      throw error;
    }
  }

  async getAllUsers() {
    await this.initialize();
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
      throw error;
    }
  }

  async getUserById(id_usuario) {
    await this.initialize();
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_usuario = ?`,
        [id_usuario]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener usuario por ID:", error);
      throw error;
    }
  }

  async getUsersByName(nombre_usuario) {
    await this.initialize();
    try {
      const palabras = nombre_usuario.trim().split(/\s+/);
      const conditions = palabras.map(() => `LOWER(nombre_usuario) LIKE ?`).join(' OR ');
      const values = palabras.map(p => `%${p.toLowerCase()}%`);
      const query = `SELECT * FROM ${this.table} WHERE ${conditions}`;
      return await this.execute(query, values);
    } catch (error) {
      console.error("❌ Error al obtener usuarios por nombre:", error);
      throw error;
    }
  }

  async addUser({ nombre_usuario, email, pass }) {
    await this.initialize();
    const sql = `INSERT INTO ${this.table} (nombre_usuario, email, pass) VALUES (?, ?, ?)`;
    try {
      return await this.execute(sql, [nombre_usuario, email, pass]);
    } catch (error) {
      console.error("❌ Error al agregar usuario:", error);
      throw error;
    }
  }

  async updateUser({ id_usuario, nombre_usuario, email, pass }) {
    await this.initialize();
    const sql = `UPDATE ${this.table} SET nombre_usuario = ?, email = ?, pass = ? WHERE id_usuario = ?`;
    try {
      return await this.execute(sql, [nombre_usuario, email, pass, id_usuario]);
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      throw error;
    }
  }

  async deleteUser(id_usuario) {
    await this.initialize();
    const sql = `DELETE FROM ${this.table} WHERE id_usuario = ?`;
    try {
      return await this.execute(sql, [id_usuario]);
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      throw error;
    }
  }
}
