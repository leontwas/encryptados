import OrdenesDaoMysql from "../db/daos/ordenes.dao.mysql.js";
import ordenesMock from "../db/mocks/ordenes.mock.js";

export async function loadOrdenesToDb() {
  const ordenesDao = new OrdenesDaoMysql();
  await ordenesDao.init();

  for (const ord of ordenesMock) {
    try {
      await ordenesDao.addOrden({
        usuario_id: ord.usuario_id,
        direccion_id: ord.direccion_id,
        saldo: ord.saldo,
        estado: ord.estado,
        fecha_facturacion: ord.fecha_facturacion, // 👈 CORRECTO
      });
      console.log(`✅ Orden ID ${ord.id_orden} agregada correctamente.`);
    } catch (error) {
      console.error(`❌ Error al agregar orden ID ${ord.id_orden}:`, error);
    }
  }
}

