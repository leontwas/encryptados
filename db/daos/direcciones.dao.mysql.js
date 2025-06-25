import Mysql from "../connections/Mysql.js";

export default class DireccionDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "direccion";
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
          id_direccion INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT(11) NOT NULL,
          etiqueta VARCHAR(50),
          calle VARCHAR(100) NOT NULL,
          nro INT(11) NOT NULL,
          localidad VARCHAR(50) NOT NULL,
          provincia VARCHAR(50) NOT NULL,
          pais VARCHAR(50) NOT NULL,
          codigo_postal VARCHAR(15) NOT NULL,
          is_facturado BOOLEAN NOT NULL DEFAULT 0,
          FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
      `;
      await this.execute(query);
      console.log(`✅ Tabla '${this.table}' creada o verificada correctamente`);
    } catch (error) {
      console.error(`❌ Error al crear tabla '${this.table}':`, error);
    }
  }

  // Método privado para asegurar conexión
  async #checkConnection() {
    if (!this.connection) {
      await this.initialize();
    }
  }

  async getAllDirecciones() {
    await this.#checkConnection();
    try {
      return await this.execute(`SELECT * FROM ${this.table}`);
    } catch (error) {
      console.error("❌ Error al obtener direcciones:", error);
      throw error;
    }
  }

  async getDireccionById(id_direccion) {
    await this.#checkConnection();
    try {
      const rows = await this.execute(
        `SELECT * FROM ${this.table} WHERE id_direccion = ?`,
        [id_direccion]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Error al obtener dirección por ID:", error);
      throw error;
    }
  }

  async addDireccion({
    usuario_id,
    etiqueta,
    calle,
    nro,
    localidad,
    provincia,
    pais,
    codigo_postal,
    is_facturado = 0
  }) {
    await this.#checkConnection();
    const sql = `
      INSERT INTO ${this.table} 
      (usuario_id, etiqueta, calle, nro, localidad, provincia, pais, codigo_postal, is_facturado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      return await this.execute(sql, [
        usuario_id,
        etiqueta,
        calle,
        nro,
        localidad,
        provincia,
        pais,
        codigo_postal,
        is_facturado
      ]);
    } catch (error) {
      console.error("❌ Error al agregar dirección:", error);
      throw error;
    }
  }

  async updateDireccion({
    id_direccion,
    usuario_id,
    etiqueta,
    calle,
    nro,
    localidad,
    provincia,
    pais,
    codigo_postal,
    is_facturado = 0
  }) {
    await this.#checkConnection();
    const sql = `
      UPDATE ${this.table} SET
        usuario_id = ?,
        etiqueta = ?,
        calle = ?,
        nro = ?,
        localidad = ?,
        provincia = ?,
        pais = ?,
        codigo_postal = ?,
        is_facturado = ?
      WHERE id_direccion = ?
    `;
    try {
      return await this.execute(sql, [
        usuario_id,
        etiqueta,
        calle,
        nro,
        localidad,
        provincia,
        pais,
        codigo_postal,
        is_facturado,
        id_direccion
      ]);
    } catch (error) {
      console.error("❌ Error al actualizar dirección:", error);
      throw error;
    }
  }

  async deleteDireccion(id_direccion) {
    await this.#checkConnection();
    const sql = `DELETE FROM ${this.table} WHERE id_direccion = ?`;
    try {
      return await this.execute(sql, [id_direccion]);
    } catch (error) {
      console.error("❌ Error al eliminar dirección:", error);
      throw error;
    }
  }
}
