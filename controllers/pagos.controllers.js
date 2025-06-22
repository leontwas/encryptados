import PagosHelpers from '../helpers/pagos.helpers.js'
import PagosDaoMemory from '../db/daos/pagos.dao.memory.js'
import PagosDaoMysql from '../db/daos/pagos.dao.mysql.js'


export default class PagosControllers {

    constructor() {
       // this.db = new UsersDaoMemory()
        this.db = new PagosDaoMysql()
        this.helpers = new PagosHelpers()
    }


    getPagos = async (req, res) => {
        const pagos = await this.db.getAllPagos()
        res.json(pagos)
    }


    getPagoById = async (req, res) => {
        const { id } = req.params
        const pago = await this.db.getPagoById(id)
        res.json(pago)
    }


  addPago = async (req, res) => {
    try {
      const pagoData = this.helpers.createPago(req.body);
      const result = await this.db.addPago(pagoData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  modifyPago = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID de pago inválido" });
      }

      const pagoBody = this.helpers.createPago(req.body);
      const pagoData = { id_pago: Number(id), ...pagoBody };
      const result = await this.db.modifyPago(pagoData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


    deletePago = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deletePago(id)
        res.json(result)
    }
}