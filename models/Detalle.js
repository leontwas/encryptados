export default class Detalle {

    constructor(id_detalle_orden, orden_id, producto_id, cantidad, precio_unidad) {
        this.id_detalle_orden = id_detalle_orden;
        this.orden_id = orden_id;  
        this.producto_id = producto_id; 
        this.cantidad = cantidad;
        this.precio_unidad = precio_unidad; 
    }
}