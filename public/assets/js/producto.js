export class Producto {
    constructor(id, nombre, descripcion, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }

    render() {
        return `
            <div class="producto">
                <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid">
                <h3>${this.nombre}</h3>
                <p>${this.descripcion}</p>
                <p><strong>$${this.precio}</strong></p>
                <button class="btn btn-primary agregar-btn" data-id="${this.id}">Agregar al carrito</button>
            </div>
        `;
    }
}
