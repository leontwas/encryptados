import Mysql from '../connections/Mysql.js';

const db = new Mysql(); // ✅ Instancia compartida

export default class ProductsDaoMysql {
  constructor() {
    this.table = 'producto';
    this._init();
  }

  async _init() {
    try {
      await db.connect();
      await this.#createTable();
    } catch (error) {
      console.error('❌ Error al inicializar ProductsDaoMysql:', error);
    }
  }

  async #createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id_producto INT AUTO_INCREMENT PRIMARY KEY,
        nombre_producto VARCHAR(50) NOT NULL,
        categoria_id INT NOT NULL,
        descripcion VARCHAR(200) NOT NULL,
        precio INT NOT NULL,
        stock INT NOT NULL,
        image_url VARCHAR(200) NOT NULL COMMENT 'URL de imagen del producto'
      )
    `;
    await db.execute(query);
  }

  async getAllProducts() {
    return await db.execute(`SELECT * FROM ${this.table}`);
  }

  async getProductById(id_producto) {
    const rows = await db.execute(
      `SELECT * FROM ${this.table} WHERE id_producto = ?`,
      [id_producto]
    );
    return rows[0] || null; // ✅ Mejor devolver null si no existe
  }

  async getProductsByName(nombre_producto) {
    const query = `SELECT * FROM ${this.table} WHERE LOWER(nombre_producto) LIKE ?`;
    const values = [`%${nombre_producto.toLowerCase()}%`];
    return await db.execute(query, values);
  }

  async addProduct({ nombre_producto, categoria_id, descripcion, precio, stock, image_url }) {
    const sql = `
      INSERT INTO ${this.table} (nombre_producto, categoria_id, descripcion, precio, stock, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return await db.execute(sql, [
      nombre_producto,
      categoria_id,
      descripcion,
      precio,
      stock,
      image_url,
    ]);
  }

  async modifyProduct({ id_producto, nombre_producto, categoria_id, descripcion, precio, stock, image_url }) {
    const sql = `
      UPDATE ${this.table} SET 
        nombre_producto = ?, 
        categoria_id = ?, 
        descripcion = ?, 
        precio = ?, 
        stock = ?, 
        image_url = ?
      WHERE id_producto = ?
    `;
    return await db.execute(sql, [
      nombre_producto,
      categoria_id,
      descripcion,
      precio,
      stock,
      image_url,
      id_producto,
    ]);
  }

  async deleteProduct(id_producto) {
    const sql = `DELETE FROM ${this.table} WHERE id_producto = ?`;
    return await db.execute(sql, [id_producto]);
  }
}
