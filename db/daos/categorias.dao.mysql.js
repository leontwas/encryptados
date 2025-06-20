import Mysql from "../connections/Mysql.js";

// 👉 Función para crear la tabla 'categoria' e insertar datos iniciales
export async function createCategoriesTable() {
  const db = new Mysql();

  try {
    await db.initialize(); // Asegura la conexión antes de crear la tabla

    const query = `
      CREATE TABLE IF NOT EXISTS categoria (
        id_categoria INT(11) NOT NULL AUTO_INCREMENT,
        nombre_categoria VARCHAR(20) NOT NULL,
        PRIMARY KEY (id_categoria)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await db.execute(query);
    console.log("✅ Tabla 'categoria' creada o verificada correctamente");

    // 👉 Insertar datos iniciales si la tabla está vacía
    const [count] = await db.execute(`SELECT COUNT(*) as count FROM categoria`);
    if (count.count === 0) {
      await db.execute(`
        INSERT INTO categoria (id_categoria, nombre_categoria) VALUES
        (1, 'PC'),
        (2, 'Notebook'),
        (3, 'Tablet'),
        (4, 'Perifericos')
      `);
      console.log("✅ Datos iniciales insertados en 'categoria'");
    }
  } catch (error) {
    console.error("❌ Error al crear tabla categoria:", error);
  }
}
