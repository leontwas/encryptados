import Mysql from "../connections/Mysql.js";

export default class DetallesDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "detalle_orden";
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
          id_detalle_orden INT(11) NOT NULL AUTO_INCREMENT,
          orden_id INT(11) NOT NULL,
          producto_id INT(11) NOT NULL,
          cantidad INT(4) NOT NULL,
          precio_unidad INT(8) NOT NULL COMMENT 'Precio al momento de compra',
          PRIMARY KEY (id_detalle_orden),
          INDEX (orden_id),
          INDEX (producto_id),
          FOREIGN KEY (orden_id) REFERENCES orden(id_orden) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES producto(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
      `;
      await this.execute(query);
      console.log(`✅ Tabla '${this.table}' creada o verificada correctamente`);
    } catch (error) {
      console.error(`❌ Error al crear tabla '${this.table}':`, error);
    }
  }

  async #checkConnection() {
    if (!this.connection) {
      await this.initialize();
    }
  }

  async getAllDetalles() {
    await this.#checkConnection();
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener todos los detalles:", error);
      throw error;
    }
  }

  async getDetalleById(id_detalle_orden) {
    await this.#checkConnection();
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_detalle_orden = ?`,
        [id_detalle_orden]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener detalle por ID:", error);
      throw error;
    }
  }

  async addDetalle({ orden_id, producto_id, cantidad, precio_unidad }) {
    await this.#checkConnection();
    const sql = `
      INSERT INTO ${this.table} (orden_id, producto_id, cantidad, precio_unidad)
      VALUES (?, ?, ?, ?)
    `;
    try {
      return await this.execute(sql, [
        orden_id,
        producto_id,
        cantidad,
        precio_unidad,
      ]);
    } catch (error) {
      console.error("❌ Error al agregar detalle:", error);
      throw error;
    }
  }

  async updateDetalle({ id_detalle_orden, orden_id, producto_id, cantidad, precio_unidad }) {
    await this.#checkConnection();
    const sql = `
      UPDATE ${this.table} SET 
        orden_id = ?, 
        producto_id = ?, 
        cantidad = ?, 
        precio_unidad = ?
      WHERE id_detalle_orden = ?
    `;
    try {
      return await this.execute(sql, [
        orden_id,
        producto_id,
        cantidad,
        precio_unidad,
        id_detalle_orden,
      ]);
    } catch (error) {
      console.error("❌ Error al actualizar detalle:", error);
      throw error;
    }
  }

  async deleteDetalle(id_detalle_orden) {
    await this.#checkConnection();
    const sql = `DELETE FROM ${this.table} WHERE id_detalle_orden = ?`;
    try {
      return await this.execute(sql, [id_detalle_orden]);
    } catch (error) {
      console.error("❌ Error al eliminar detalle:", error);
      throw error;
    }
  }
}
