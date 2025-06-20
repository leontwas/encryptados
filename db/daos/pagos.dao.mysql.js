import Mysql from "../connections/Mysql.js";

// 👉 Función para crear la tabla 'pago'
export async function createPagoTable() {
  const db = new Mysql();

  try {
    await db.initialize(); // Asegura conexión activa

    const query = `
      CREATE TABLE IF NOT EXISTS pago (
        id_pago INT(11) NOT NULL AUTO_INCREMENT,
        orden_id INT(11) NOT NULL,
        metodo_pago INT(11) NOT NULL,
        estado_pago ENUM(
          'pendiente', 'pagado', 'en_proceso', 'enviado', 'entregado', 
          'cancelado', 'rechazado', 'devuelto', 'en_disputa'
        ) NOT NULL,
        fecha_pago DATETIME NOT NULL,
        PRIMARY KEY (id_pago),
        INDEX (orden_id),
        FOREIGN KEY (orden_id) REFERENCES orden(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await db.execute(query);
    console.log("✅ Tabla 'pago' creada o verificada correctamente");

  } catch (error) {
    console.error("❌ Error al crear tabla pago:", error);
  }
}
