import Orden from '../models/Orden.js';

export default class OrdenesHelpers {
  createOrden(newData) {
    const {
      id_orden,
      usuario_id,
      direccion_id,
      saldo,
      estado,
      fecha_orden // <-- lo agregamos
    } = newData;

    const orden = new Orden(
      id_orden ? parseInt(id_orden) : null,
      parseInt(usuario_id),
      parseInt(direccion_id),
      parseFloat(saldo),
      estado,
      fecha_orden // <-- Si es null, el constructor pone fecha actual
    );

    return orden;
  }
}
