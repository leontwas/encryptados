import Mysql from "../connections/Mysql.js";

export default class OrdenesDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "orden";
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
          id_orden INT(11) NOT NULL AUTO_INCREMENT,
          usuario_id INT(11) NOT NULL,
          direccion_id INT(11) NOT NULL,
          saldo DECIMAL(15,2) NOT NULL COMMENT 'Monto total a pagar',
          estado ENUM('realizado','en_proceso','cancelado','en_disputa','pendiente') NOT NULL COMMENT 'Estado actual de la orden',
          fecha_facturacion DATETIME NOT NULL COMMENT 'Fecha y hora de facturación',
          PRIMARY KEY (id_orden),
          INDEX (usuario_id),
          INDEX (direccion_id),
          FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (direccion_id) REFERENCES direccion(id_direccion) ON DELETE CASCADE ON UPDATE CASCADE
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

  async getAllOrdenes() {
    await this.#checkConnection();
    try {
      const rows = await this.execute(`SELECT * FROM ${this.table}`);
      // si tu execute devuelve un array, accede a rows[0]
      // si devuelve directamente las filas, solo return rows;
      return Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
    } catch (error) {
      console.error("❌ Error al obtener órdenes:", error);
      throw error;
    }
  }

  async getOrdenById(id_orden) {
    await this.#checkConnection();
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_orden = ?`,
        [id_orden]
      );
      const data = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
      return data[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener orden por ID:", error);
      throw error;
    }
  }

  async addOrden({ usuario_id, direccion_id, saldo, estado, fecha_facturacion }) {
    await this.#checkConnection();

    if ([usuario_id, direccion_id, saldo, estado, fecha_facturacion].some(v => v === undefined)) {
      throw new Error(`❗ Parámetros inválidos en addOrden(): ${JSON.stringify({ usuario_id, direccion_id, saldo, estado, fecha_facturacion })}`);
    }

    const sql = `
      INSERT INTO ${this.table} (usuario_id, direccion_id, saldo, estado, fecha_facturacion)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
      const result = await this.execute(sql, [
        usuario_id,
        direccion_id,
        saldo,
        estado,
        fecha_facturacion,
      ]);
      return result;
    } catch (error) {
      console.error("❌ Error al agregar orden:", error);
      throw error;
    }
  }

  async updateOrden({ id_orden, usuario_id, direccion_id, saldo, estado, fecha_facturacion }) {
    await this.#checkConnection();

    if ([id_orden, usuario_id, direccion_id, saldo, estado, fecha_facturacion].some(v => v === undefined)) {
      throw new Error(`❗ Parámetros inválidos en updateOrden(): ${JSON.stringify({ id_orden, usuario_id, direccion_id, saldo, estado, fecha_facturacion })}`);
    }

    const sql = `
      UPDATE ${this.table}
      SET usuario_id = ?, direccion_id = ?, saldo = ?, estado = ?, fecha_facturacion = ?
      WHERE id_orden = ?
    `;

    try {
      const result = await this.execute(sql, [
        usuario_id,
        direccion_id,
        saldo,
        estado,
        fecha_facturacion,
        id_orden,
      ]);
      return result;
    } catch (error) {
      console.error("❌ Error al actualizar orden:", error);
      throw error;
    }
  }

  async deleteOrden(id_orden) {
    await this.#checkConnection();
    try {
      const result = await this.execute(`DELETE FROM ${this.table} WHERE id_orden = ?`, [id_orden]);
      return result;
    } catch (error) {
      console.error("❌ Error al eliminar orden:", error);
      throw error;
    }
  }
}

// Función independiente para crear la tabla
export async function createOrdenTable() {
  const db = new Mysql();

  try {
    await db.initialize();

    const query = `
      CREATE TABLE IF NOT EXISTS orden (
        id_orden INT(11) NOT NULL AUTO_INCREMENT,
        usuario_id INT(11) NOT NULL,
        direccion_id INT(11) NOT NULL,
        saldo DECIMAL(15,2) NOT NULL COMMENT 'Monto total a pagar',
        estado ENUM('realizado','en_proceso','cancelado','en_disputa','pendiente') NOT NULL COMMENT 'Estado actual de la orden',
        fecha_facturacion DATETIME NOT NULL COMMENT 'Fecha y hora de facturación',
        PRIMARY KEY (id_orden),
        INDEX (usuario_id),
        INDEX (direccion_id),
        FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (direccion_id) REFERENCES direccion(id_direccion) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await db.execute(query);
    console.log("✅ Tabla 'orden' creada o verificada correctamente");
  } catch (error) {
    console.error("❌ Error al crear tabla 'orden':", error);
  }
}
