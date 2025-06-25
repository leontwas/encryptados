export default class Orden {
  constructor(id_orden, usuario_id, direccion_id, saldo, estado, fecha_facturacion = null) {
    this.id_orden = id_orden;
    this.usuario_id = usuario_id;
    this.direccion_id = direccion_id;
    this.saldo = saldo;
    this.estado = estado;
    this.fecha_orden = fecha_facturacion ? new Date(fecha_facturacion) : new Date();
  }
}
