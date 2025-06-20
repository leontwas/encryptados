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
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id_orden INT(11) NOT NULL AUTO_INCREMENT,
        usuario_id INT(11) NOT NULL,
        direccion_id INT(11) NOT NULL,
        saldo INT(8) NOT NULL COMMENT 'Monto a pagar',
        estado ENUM('realizado','en_proceso','cancelado') NOT NULL,
        fecha_orden DATETIME NOT NULL COMMENT 'Fecha y hora en que se realiza la orden',
        PRIMARY KEY (id_orden),
        INDEX (usuario_id),
        INDEX (direccion_id),
        FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (direccion_id) REFERENCES direccion(id_direccion) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await this.execute(query);
  }

  async getAll() {
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener órdenes:", error);
      throw error;
    }
  }

  async getById(id_orden) {
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_orden = ?`,
        [id_orden]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener orden por ID:", error);
      throw error;
    }
  }

  async add(orden) {
    const { usuario_id, direccion_id, saldo, estado, fecha_orden } = orden;
    const sql = `
      INSERT INTO ${this.table} (usuario_id, direccion_id, saldo, estado, fecha_orden)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      const result = await this.execute(sql, [usuario_id, direccion_id, saldo, estado, fecha_orden]);
      return result;
    } catch (error) {
      console.error("❌ Error al agregar orden:", error);
      throw error;
    }
  }

  async update(orden) {
    const { id_orden, usuario_id, direccion_id, saldo, estado, fecha_orden } = orden;
    const sql = `
      UPDATE ${this.table}
      SET usuario_id = ?, direccion_id = ?, saldo = ?, estado = ?, fecha_orden = ?
      WHERE id_orden = ?
    `;
    try {
      const result = await this.execute(sql, [usuario_id, direccion_id, saldo, estado, fecha_orden, id_orden]);
      return result;
    } catch (error) {
      console.error("❌ Error al actualizar orden:", error);
      throw error;
    }
  }

  async delete(id_orden) {
    const sql = `DELETE FROM ${this.table} WHERE id_orden = ?`;
    try {
      const result = await this.execute(sql, [id_orden]);
      return result;
    } catch (error) {
      console.error("❌ Error al eliminar orden:", error);
      throw error;
    }
  }
}

// 👉 Función para crear la tabla 'orden'
export async function createOrdenTable() {
  const db = new Mysql();

  try {
    await db.initialize(); // Conexión asegurada

    const query = `
      CREATE TABLE IF NOT EXISTS orden (
        id_orden INT(11) NOT NULL AUTO_INCREMENT,
        usuario_id INT(11) NOT NULL,
        direccion_id INT(11) NOT NULL,
        saldo INT(8) NOT NULL COMMENT 'Monto a pagar',
        estado ENUM('realizado','en_proceso','cancelado') NOT NULL,
        fecha_orden DATETIME NOT NULL COMMENT 'Fecha y hora en que se realiza la orden',
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
    console.error("❌ Error al crear tabla orden:", error);
  }
}
