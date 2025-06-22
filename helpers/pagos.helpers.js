import Pago from '../models/Pago.js'

export default class PagosHelpers {
    createPago(newData) {
        const { id_pago, orden_id, metodo_pago, estado_pago, fecha_pago } = newData

        const pago = new Pago(
            parseInt(id_pago),
            parseInt(orden_id),
            metodo_pago,
            estado_pago,
            fecha_pago ? this.formatDate(fecha_pago) : null
        )

        return pago
    }

    // 👉 Función para formatear fecha a 'DD-MM-YYYY HH:mm:ss'
    formatDate(fecha) {
        const date = new Date(fecha)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Mes comienza en 0
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    }
}
