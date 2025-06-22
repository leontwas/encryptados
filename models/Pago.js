export default class Pago {

    constructor(id_pago, orden_id, metodo_pago, estado_pago, fecha_pago) {
        this.id_pago = id_pago;
        this.orden_id = orden_id;  
        this.metodo_pago = metodo_pago; 
        this.estado_pago = estado_pago;
        this.fecha_pago = fecha_pago; 
    }
}