export default class Orden {
  constructor(id_orden, usuario_id, direccion_id, saldo, estado, fecha_orden = null) {
    this.id_orden = id_orden;
    this.usuario_id = usuario_id;
    this.direccion_id = direccion_id;
    this.saldo = saldo;
    this.estado = estado;
    this.fecha_orden = fecha_orden ? new Date(fecha_orden) : new Date();
  }
}
