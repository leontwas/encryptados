export default class Product {

    constructor(id_producto, nombre_producto, categoria_id, descripcion, precio, stock, imagen_url, estado) {
        this.id_producto = id_producto;   
        this.nombre_producto = nombre_producto;
        this.categoria_id = categoria_id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen_url = imagen_url;
        this.estado = estado; // 1: activo, 0: inactivo   
    }
}