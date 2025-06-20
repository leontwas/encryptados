import detallesMock from '../mocks/detalles.mock.js';

export default class DetallesDaoMemory {
  constructor() {
    this.detalles = detallesMock; // Array inicial de detalles mock
  }

  // Obtener todos los detalles
  getAllDetalles() {
    return this.detalles;
  }

  // Obtener un detalle por su ID
  getDetalleById(id) {
    const idNum = parseInt(id);
    return this.detalles.find(detalle => detalle.id_detalle_orden === idNum) || null;
  }

  // Agregar un nuevo detalle
  addDetalle(detalle) {
    this.detalles.push(detalle);
    return detalle;
  }

  // Actualizar un detalle existente
  updateDetalle(data) {
    let modifiedDetalle = null;
    this.detalles = this.detalles.map((detalle) => {
      if (detalle.id_detalle_orden === data.id_detalle_orden) {
        modifiedDetalle = data;
        return data;
      }
      return detalle;
    });
    return modifiedDetalle;
  }

  // Eliminar un detalle por ID
  deleteDetalle(id) {
    const idNum = parseInt(id);
    const found = this.detalles.some(detalle => detalle.id_detalle_orden === idNum);
    if (found) {
      this.detalles = this.detalles.filter(detalle => detalle.id_detalle_orden !== idNum);
    }
    return found;
  }
}
