import Mysql from "../connections/Mysql.js";

export default class ProductsDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "producto";
  }

  async init() {
    if (!this.connection) {
      await this.initialize(); // Asegura que Mysql conecte
    }
    await this.#createTable();
  }

  async #createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
      id_producto INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nombre_producto VARCHAR(50) NOT NULL,
      categoria_id INT(11) NOT NULL,
      descripcion VARCHAR(200) NOT NULL,
      precio DECIMAL(10,2) NOT NULL,
      stock INT(11) NOT NULL,
      imagen_url VARCHAR(200) NOT NULL COMMENT 'URL de imagen del producto',
      estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: activo, 0: inactivo'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

    await this.execute(query);
  }

  async getAllProducts() {
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener todos los productos:", error);
      throw error;
    }
  }

  async getProductById(id_producto) {
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_producto = ?`,
        [id_producto]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener producto por ID:", error);
      throw error;
    }
  }

  async getProductsByName(nombre_producto) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE LOWER(nombre_producto) LIKE ?`;
      const values = [`%${nombre_producto.toLowerCase()}%`];
      return await this.execute(query, values);
    } catch (error) {
      console.error("❌ Error al obtener productos por nombre:", error);
      throw error;
    }
  }

  async addProduct({ nombre_producto, categoria_id, descripcion, precio, stock, imagen_url, estado = 1 }) {
    const sql = `
      INSERT INTO ${this.table} (nombre_producto, categoria_id, descripcion, precio, stock, imagen_url, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      return await this.execute(sql, [
        nombre_producto,
        categoria_id,
        descripcion,
        precio,
        stock,
        imagen_url,
        estado,
      ]);
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      throw error;
    }
  }

  async updateProduct({ id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url, estado }) {
    const sql = `
      UPDATE ${this.table} SET 
        nombre_producto = ?, 
        categoria_id = ?, 
        descripcion = ?, 
        precio = ?, 
        stock = ?, 
        imagen_url = ?,
        estado = ?
      WHERE id_producto = ?
    `;
    try {
      return await this.execute(sql, [
        nombre_producto,
        categoria_id,
        descripcion,
        precio,
        stock,
        imagen_url,
        estado,
        id_producto
      ]);
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      throw error;
    }
  }

  async deleteProduct(id_producto) {
    const sql = `DELETE FROM ${this.table} WHERE id_producto = ?`;
    try {
      return await this.execute(sql, [id_producto]);
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      throw error;
    }
  }
}

// 👉 Exporto la función para app.js
export async function createProductsTable() {
  const db = new Mysql();
  await db.initialize();  // <-- Asegura conexión antes de ejecutar query
  const query = `
    CREATE TABLE IF NOT EXISTS producto (
      id_producto INT(11) NOT NULL AUTO_INCREMENT,
      nombre_producto VARCHAR(50) NOT NULL,
      categoria_id INT(11) NOT NULL,
      descripcion VARCHAR(200) NOT NULL,
      precio DECIMAL(10,2) NOT NULL,
      stock INT(11) NOT NULL,
      imagen_url VARCHAR(200) NOT NULL COMMENT 'URL de imagen del producto',
      estado TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: activo, 0: inactivo',
      PRIMARY KEY (id_producto)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  try {
    await db.execute(query);
    console.log("✅ Tabla 'producto' creada o verificada correctamente");
  } catch (error) {
    console.error("❌ Error al crear tabla producto:", error);
  }
}
