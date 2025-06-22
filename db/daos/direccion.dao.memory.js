import DireccionesMock from '../mocks/direcciones.mock.js'


export default class DireccionesDaoMemory {
  constructor() {
    this.direcciones = DireccionesMock;
  }

  getAllDirecciones() {
    return this.direcciones;
  }

  getDireccionById(id) {
    const direccion = this.direcciones.find(
      (direccion) => direccion.id_direccion === parseInt(id)
    );
    return direccion;
  }

  addDireccion(direccion) {
    this.direcciones.push(direccion);
    return true;
  }

  updateDireccion(data) {
    let modifiedDireccion = null;
    this.direcciones = this.direcciones.map((direccion) => {
      if (direccion.id_direccion === data.id_direccion) {
        modifiedDireccion = data;
        return data;
      }
      return direccion;
    });
    return modifiedDireccion;
  }

  deleteDireccion(id) {
    const idNum = parseInt(id);
    const found = this.direcciones.some((direccion) => direccion.id_direccion === idNum);
    if (found) {
      this.direcciones = this.direcciones.filter((direccion) => direccion.id_direccion !== idNum);
    }
    return found;
  }
}