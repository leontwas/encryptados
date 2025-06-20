import ordenesMock from '../mocks/ordenes.mock.js';

export default class OrdenesDaoMemory {
  constructor() {
    this.ordenes = ordenesMock; 
  }

  // Obtener todas las órdenes
  getAllOrdenes() {
    return this.ordenes;
  }

  // Obtener un orden por su ID
  getOrdenById(id) {
    const idNum = parseInt(id);
    return this.ordenes.find(orden => orden.id_orden === idNum) || null;
  }

  // Agregar una nueva orden
  addOrden(orden) {
    this.ordenes.push(orden);
    return orden;
  }

  // Actualizar una orden existente
  updateOrden(data) {
    let modifiedOrden = null;
    this.ordenes = this.ordenes.map((orden) => {
      if (orden.id_orden ===data.id_orden) {
        modifiedOrden = data;
        return data;
      }
      return orden;
    });
    return modifiedOrden;
  }

  // Eliminar un detalle por ID
  deleteOrden(id) {
    const idNum = parseInt(id);
    const found = this.ordenes.some(orden => orden.id_orden === idNum);
    if (found) {
      this.ordenes = this.ordenes.filter(orden => orden.id_orde !== idNum);
    }
    return found;
  }
}
