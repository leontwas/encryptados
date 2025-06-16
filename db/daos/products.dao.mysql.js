import Mysql from '../connections/Mysql.js';


export default class ProductsDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = 'producto';
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
    try {
      const query = `SELECT * FROM ${this.table}`;
      const [result] = await this.connection.promise().query(query);
      return result;
    } catch (err) {
      console.log("Problemas al obtener los productos");
      return [];
    }
  }

  async getProductById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id_producto = ?`;
    const [result] = await this.connection.promise().query(query, [id]);
    return result;
  }

    async getProductsByName(nombre_producto) {
    const query = `SELECT * FROM ${this.table} WHERE nombre_producto LIKE ?`;
    const values = [`%${nombre_producto}%`]; // Busca coincidencias parciales
    const [result] = await this.connection.promise().query(query, values);
    return result;
}

  async addProduct(product) {
    const { id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url } = product;
    const query = `INSERT INTO ${this.table} VALUES (?,?,?,?,?,?,?)`;
    const [result] = await this.connection
      .promise()
      .query(query, [id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url]);
    return result;
  }

  async modifyProduct(producto) {
    const { id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url } = producto;
    const query = `UPDATE ${this.table} SET nombre_producto = ?,  categoria_id = ?, descripcion = ?, precio = ?, stock = ? , imagen_url = ? WHERE id_producto = ?`;
    const [result] = await this.connection
      .promise()
      .query(query, [nombre_producto, categoria_id, descripcion, precio, stock, imagen_url, id_producto]);
    return result;
  }

  async deleteProduct(id_producto) {
    const query = `DELETE FROM ${this.table} WHERE id_producto = ${id_producto}`;
    const [result] = await this.connection.promise().query(query);
    return result;
  }
}
