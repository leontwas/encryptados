import DireccionesDaoMysql from "../db/daos/direcciones.dao.mysql.js";
import direccionesMock from "../db/mocks/direcciones.mock.js";

export async function loadDireccionesToDb() {
  const direccionesDao = new DireccionesDaoMysql();
  await direccionesDao.init();

  for (const dir of direccionesMock) {
    try {
      await direccionesDao.addDireccion({
        usuario_id: dir.usuario_id,
        etiqueta: dir.etiqueta,
        calle: dir.calle,
        nro: dir.nro,
        localidad: dir.localidad,
        provincia: dir.provincia,
        pais: dir.pais,
        codigo_postal: dir.codigo_postal,
        is_facturado: dir.is_facturado,
      });
      console.log(`Dirección '${dir.etiqueta}' para usuario ${dir.usuario_id} agregada correctamente.`);
    } catch (error) {
      console.error(`Error al agregar dirección '${dir.etiqueta}' para usuario ${dir.usuario_id}:`, error);
    }
  }
}
