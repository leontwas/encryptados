import Orden from '../models/Orden.js';

export default class OrdenesHelpers {
  createOrden(newData) {
    const {
      id_orden,
      usuario_id,
      direccion_id,
      saldo,
      estado,
      fecha_facturacion
    } = newData;

    const orden = new Orden(
      id_orden ? parseInt(id_orden) : null,
      parseInt(usuario_id),
      parseInt(direccion_id),
      parseFloat(saldo),
      estado,
      fecha_facturacion ? this.formatDate(fecha_facturacion) : this.formatDate(new Date()) // 👉 parseo la fecha o pongo fecha actual
    );

    return orden;
  }

  // 👉 Función para formatear fecha a 'DD-MM-YYYY HH:mm:ss'
  formatDate(fecha) {
    const date = new Date(fecha);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}
