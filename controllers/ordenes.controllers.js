import OrdenesHelpers from '../helpers/ordenes.helpers.js'
import OrdenesDaoMemory from '../db/daos/ordenes.dao.memory.js'
import OrdenesDaoMysql from '../db/daos/ordenes.dao.mysql.js'


export default class OrdenesControllers {

    constructor() {
       // this.db = new OredenesDaoMemory()
        this.db = new  OrdenesDaoMysql()
        this.helpers = new OrdenesHelpers()
    }


    getOrdenes = async (req, res) => {
        const ordenes = await this.db.getAllOrdenes()
        res.json(ordenes)
    }


    getOrdenById = async (req, res) => {
        const { id } = req.params
        const orden = await this.db.getOrdenById(id)
        res.json(orden)
    }


     addOrden = async (req, res) => {
    try {
      const ordenData = this.helpers.createOrden(req.body);
      const result = await this.db.addOrden(ordenData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  modifyOrden = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID de orden de compra inválido" });
      }

      const ordenBody = this.helpers.createOrden(req.body);
      const ordenData = { id_orden: Number(id), ...ordenBody };
      const result = await this.db.updateOrden(ordenData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


    deleteOrden = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteOrden(id)
        res.json(result)
    }
}