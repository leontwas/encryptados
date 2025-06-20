import Detalle from '../models/Detalle.js'

export default class DetallesHelpers {

    createDetalle(newData) {
        const { id_detalle_orden, orden_id, producto_id, cantidad, precio_unidad } = newData
        const detalle = new Detalle(parseInt(id_detalle_orden), parseInt(orden_id), parseInt(producto_id), parseInt(cantidad), parseInt(precio_unidad))
        return detalle
    }
}