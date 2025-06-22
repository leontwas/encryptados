import pagosMock from "../mocks/pagos.mock.js";

export default class PagosDaoMemory {
  constructor() {
    this.pagos = pagosMock;
  }

  getAllPagos() {
    return this.pagos;
  }

  getPagoById(id) {
    const pago = this.pagos.find((pago) => pago.id_pago === parseInt(id));
    return pago;
  }

  addPago(pago) {
    this.pagos.push(pago);
    return true;
  }

  updatePago(data) {
    let modifiedPago = null;
    this.pagos = this.pagos.map((pago) => {
      if (pago.id_pago === data.id_pago) {
        modifiedPago = data;
        return data;
      }
      return pago;
    });
    return modifiedPago;
  }

  deletePago(id) {
    const idNum = parseInt(id);
    const found = this.pagos.some((pago) => pago.id_pago === idNum);
    if (found) {
      this.pagos = this.pagos.filter((pago) => pago.id_pago !== idNum);
    }
    return found;
  }
}
