import Mysql from "../connections/Mysql.js";

// 👉 Función para crear la tabla 'direccion'
export async function createDireccionTable() {
  const db = new Mysql();

  try {
    await db.initialize(); // Conexión asegurada

    const query = `
      CREATE TABLE IF NOT EXISTS direccion (
        id_direccion INT(11) NOT NULL AUTO_INCREMENT,
        usuario_id INT(11) NOT NULL,
        etiqueta VARCHAR(20) NOT NULL COMMENT '"Casa", "Trabajo", etc',
        calle VARCHAR(20) NOT NULL,
        nro INT(5) NOT NULL,
        localidad VARCHAR(30) NOT NULL,
        provincia VARCHAR(30) NOT NULL,
        pais VARCHAR(30) NOT NULL,
        codigo_postal VARCHAR(20) NOT NULL,
        is_facturado TINYINT(1) NOT NULL COMMENT 'True si es para facturación',
        PRIMARY KEY (id_direccion),
        INDEX (usuario_id),
        FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await db.execute(query);
    console.log("✅ Tabla 'direccion' creada o verificada correctamente");

  } catch (error) {
    console.error("❌ Error al crear tabla direccion:", error);
  }
}
