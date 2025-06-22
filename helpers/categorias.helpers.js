import Categoria from '../models/Categoria.js'

export default class CategoriasHelpers {

    createCategoria(newData) {
        const { id_categoria, nombre_categoria } = newData
        const categoria = new Categoria(parseInt(id_categoria), nombre_categoria)
        return categoria
    }
}