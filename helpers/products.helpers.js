import Product from '../models/Product.js'

export default class ProductsHelpers {

    createUser(newData) {
        const { id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url } = newData
        const product = new Product(parseInt(id_producto), nombre_producto, parseInt(categoria_id), descripcion, parseInt(precio), parseInt(stock), imagen_url)
        return product
    }
}