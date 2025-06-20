import Mysql from "../connections/Mysql.js";

export default class UsersDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "usuario";
  }

  async init() {
    if (!this.connection) {
      await this.initialize(); // Asegura que Mysql conecte
    }
    await this.#createTable();
  }

  async #createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
      id_usuario INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nombre_usuario VARCHAR(50) NOT NULL COMMENT 'nombre completo',
      email VARCHAR(50) NOT NULL,
      pass VARCHAR(100) NOT NULL COMMENT 'Guarda el hash, no el texto'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

    await this.execute(query);
  }

  async getAllUsers() {
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
      throw error;
    }
  }

  async getUserById(id_usuario) {
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
    const sql = `INSERT INTO ${this.table} (nombre_usuario, email, pass) VALUES (?, ?, ?)`;
    try {
      return await this.execute(sql, [nombre_usuario, email, pass]);
    } catch (error) {
      console.error("❌ Error al agregar usuario:", error);
      throw error;
    }
  }

  async updateUser({ id_usuario, nombre_usuario, email, pass }) {
    const sql = `UPDATE ${this.table} SET nombre_usuario = ?, email = ?, pass = ? WHERE id_usuario = ?`;
    try {
      return await this.execute(sql, [nombre_usuario, email, pass, id_usuario]);
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      throw error;
    }
  }

  async deleteUser(id_usuario) {
    const sql = `DELETE FROM ${this.table} WHERE id_usuario = ?`;
    try {
      return await this.execute(sql, [id_usuario]);
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
      throw error;
    }
  }
}

// 👉 Exporto la función para app.js
export async function createUsersTable() {
  const db = new Mysql();
  await db.initialize();  // <-- Aseguramos conexión antes de ejecutar query
  const query = `
    CREATE TABLE IF NOT EXISTS usuario (
      id_usuario INT(11) NOT NULL AUTO_INCREMENT,
      nombre_usuario VARCHAR(50) NOT NULL COMMENT 'nombre completo',
      email VARCHAR(50) NOT NULL UNIQUE,
      pass VARCHAR(100) NOT NULL COMMENT 'Guarda el hash, no el texto',
      estado TINYINT(1) DEFAULT 1 COMMENT '1: activo, 0: inactivo',
      PRIMARY KEY (id_usuario)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  try {
    await db.execute(query);
    console.log("✅ Tabla 'usuario' creada o verificada correctamente");
  } catch (error) {
    console.error("❌ Error al crear tabla usuario:", error);
  }
}
