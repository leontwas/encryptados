import Mysql from '../connections/Mysql.js';


export default class ProductsDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "producto";
    this.#createTable();
  }

  #createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
        id_producto int(11) NOT NULL,
        nombre_producto varchar(50) NOT NULL,
        categoria_id int(11) NOT NULL,
        descripcion varchar(200) NOT NULL,
        precio int(7) NOT NULL,
        stock int(3) NOT NULL,
        image_url varchar(200) NOT NULL COMMENT 'URL de imagen del producto'
)`;

    this.connection.query(query);
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