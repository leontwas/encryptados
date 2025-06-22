import Mysql from "../connections/Mysql.js";

export default class PagosDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "pago";
  }

  async init() {
    if (!this.connection) {
      await this.initialize(); // Asegura que Mysql conecte
    }
    await this.#createTable();
  }

  async #createTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
          id_pago INT(11) NOT NULL AUTO_INCREMENT,
          orden_id INT(11) NOT NULL,
          metodo_pago ENUM('tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo') NOT NULL COMMENT 'Método utilizado para el pago',
          estado_pago ENUM(
            'pendiente', 'pagado', 'en_proceso', 'enviado', 'entregado', 
            'cancelado', 'rechazado', 'devuelto', 'en_disputa'
          ) NOT NULL COMMENT 'Estado actual del pago',
          fecha_pago DATETIME NOT NULL COMMENT 'Fecha y hora en que se realizó el pago',
          PRIMARY KEY (id_pago),
          INDEX (orden_id),
          FOREIGN KEY (orden_id) REFERENCES orden(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
      `;

      await this.execute(query);
      console.log(`✅ Tabla '${this.table}' creada o verificada correctamente`);

    } catch (error) {
      console.error(`❌ Error al crear tabla '${this.table}':`, error);
    }
  }

  async getAllPagos() {
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener pagos:", error);
      throw error;
    }
  }

  async getPagoById(id_pago) {
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_pago = ?`,
        [id_pago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener pago por ID:", error);
      throw error;
    }
  }

  async addPago({ orden_id, metodo_pago, estado_pago, fecha_pago }) {
    const sql = `INSERT INTO ${this.table} (orden_id, metodo_pago, estado_pago, fecha_pago) VALUES (?, ?, ?, ?)`;
    try {
      return await this.execute(sql, [orden_id, metodo_pago, estado_pago, fecha_pago]);
    } catch (error) {
      console.error("❌ Error al agregar pago:", error);
      throw error;
    }
  }

  async updatePago({ id_pago, orden_id, metodo_pago, estado_pago, fecha_pago }) {
    const sql = `UPDATE ${this.table} SET orden_id = ?, metodo_pago = ?, estado_pago = ?, fecha_pago = ? WHERE id_pago = ?`;
    try {
      return await this.execute(sql, [orden_id, metodo_pago, estado_pago, fecha_pago, id_pago]);
    } catch (error) {
      console.error("❌ Error al actualizar pago:", error);
      throw error;
    }
  }

  async deletePago(id_pago) {
    const sql = `DELETE FROM ${this.table} WHERE id_pago = ?`;
    try {
      return await this.execute(sql, [id_pago]);
    } catch (error) {
      console.error("❌ Error al eliminar pago:", error);
      throw error;
    }
  }
}

// 👉 Exporto la función para app.js
export async function createPagosTable() {
  const db = new Mysql();
  await db.initialize(); // <-- Aseguramos conexión antes de ejecutar query

  const query = `
    CREATE TABLE IF NOT EXISTS pago (
      id_pago INT(11) NOT NULL AUTO_INCREMENT,
      orden_id INT(11) NOT NULL,
      metodo_pago ENUM('tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo') NOT NULL COMMENT 'Método utilizado para el pago',
      estado_pago ENUM(
        'pendiente', 'pagado', 'en_proceso', 'enviado', 'entregado', 
        'cancelado', 'rechazado', 'devuelto', 'en_disputa'
      ) NOT NULL COMMENT 'Estado actual del pago',
      fecha_pago DATETIME NOT NULL COMMENT 'Fecha y hora en que se realizó el pago',
      PRIMARY KEY (id_pago),
      INDEX (orden_id),
      FOREIGN KEY (orden_id) REFERENCES orden(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `;

  try {
    await db.execute(query);
    console.log("✅ Tabla 'pago' creada o verificada correctamente");
  } catch (error) {
    console.error("❌ Error al crear tabla 'pago':", error);
  }
}
