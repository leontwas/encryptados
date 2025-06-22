import PagosDaoMysql from "../db/daos/pagos.dao.mysql.js";
import pagosMock from "../db/mocks/pagos.mock.js";

export async function loadPagosToDb() {
  const pagosDao = new PagosDaoMysql();
  await pagosDao.init();

  for (const pago of pagosMock) {
    try {
      await pagosDao.addPago({
        orden_id: pago.orden_id,
        metodo_pago: pago.metodo_pago,
        estado_pago: pago.estado_pago,
        fecha_pago: pago.fecha_pago,
      });
      console.log(`Pago ID ${pago.id_pago} agregado correctamente.`);
    } catch (error) {
      console.error(`Error al agregar pago ID ${pago.id_pago}:`, error);
    }
  }
}
