import DetallesDaoMysql from "../db/daos/detalles.dao.mysql.js";
import detallesMock from "../db/mocks/detalles.mock.js";

export async function loadDetallesToDb() {
  const detallesDao = new DetallesDaoMysql();
  await detallesDao.init();

  for (const detalle of detallesMock) {
    try {
      await detallesDao.addDetalle({
        orden_id: detalle.orden_id,
        producto_id: detalle.producto_id,
        cantidad: detalle.cantidad,
        precio_unidad: detalle.precio_unidad,
      });
      console.log(`Detalle ID ${detalle.id_detalle_orden} agregado correctamente.`);
    } catch (error) {
      console.error(`Error al agregar detalle ID ${detalle.id_detalle_orden}:`, error);
    }
  }
}
