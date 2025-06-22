export default class Direccion {
  constructor(id_direccion, usuario_id, etiqueta, calle, nro, localidad, provincia, pais, codigo_postal, is_facturado ) {
    this.id_direccion = id_direccion;
    this.usuario_id = usuario_id;
    this.etiqueta = etiqueta;
    this.calle = calle;
    this.nro = nro;
    this.localidad = localidad;
    this.provincia = provincia;
    this.pais = pais;
    this.codigo_postal = codigo_postal;
    this.is_facturado = is_facturado; // true: es facturado, false: no es facturado
  }
}