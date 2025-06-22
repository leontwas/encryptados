import Direccion from '../models/Direccion.js'

export default class DireccionesHelpers {

    createDireccion(newData) {
        const { id_direccion, usuario_id, etiqueta, calle, nro, localidad, provincia, pais, codigo_postal, is_facturado } = newData
        const direccion = new Direccion(parseInt(id_direccion), parseInt(usuario_id), etiqueta, calle, parseInt(nro), localidad, provincia, pais, codigo_postal, parseInt(is_facturado))
        return direccion
    }
}