import Mysql from "../connections/Mysql.js";

export default class CategoriasDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "categoria";
  }

  async init() {
    if (!this.connection) {
      await this.initialize();
    }
    await this.#createTable();
  }

  async #createTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
          id_categoria INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
          nombre_categoria VARCHAR(20) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
      `;
      await this.execute(query);
      console.log(`✅ Tabla '${this.table}' creada o verificada correctamente`);
    } catch (error) {
      console.error(`❌ Error al crear tabla '${this.table}':`, error);
    }
  }

  async getAllCategorias() {
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener categorías:", error);
      throw error;
    }
  }

  async getCategoriaById(id_categoria) {
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_categoria = ?`,
        [id_categoria]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener categoría por ID:", error);
      throw error;
    }
  }

  async addCategoria({ nombre_categoria }) {
    try {
      const sql = `INSERT INTO ${this.table} (nombre_categoria) VALUES (?)`;
      return await this.execute(sql, [nombre_categoria]);
    } catch (error) {
      console.error("❌ Error al agregar categoría:", error);
      throw error;
    }
  }

  async deleteCategoria(id_categoria) {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id_categoria = ?`;
      return await this.execute(sql, [id_categoria]);
    } catch (error) {
      console.error("❌ Error al eliminar categoría:", error);
      throw error;
    }
  }
}

// 👉 Exporto función para crear tabla desde app.js o script inicial
export async function createCategoriasTable() {
  const db = new Mysql();
  try {
    await db.initialize();
    const query = `
      CREATE TABLE IF NOT EXISTS categoria (
        id_categoria INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre_categoria VARCHAR(20) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await db.execute(query);
    console.log("✅ Tabla 'categoria' creada o verificada correctamente");
  } catch (error) {
    console.error("❌ Error al crear tabla categoria:", error);
  }
}
