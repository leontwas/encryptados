import DetallesHelpers from "../helpers/detalles.helpers.js";
import DetallesDaoMemory from "../db/daos/detalles.dao.memory.js";
import DetallesDaoMysql from "../db/daos/detalles.dao.mysql.js";

export default class DetallesControllers {
  constructor() {
    //this.db = new DetallesDaoMemory();
    this.db = new DetallesDaoMysql();
    this.helpers = new DetallesHelpers();
  }

  getDetalles = async (req, res) => {
    const detalles = await this.db.getAllDetalles();
    res.json(detalles);
  };

  getDetalleById = async (req, res) => {
    const { id } = req.params;
    const detalle = await this.db.getDetalleById(id);
    res.json(detalle);
  };

  addDetalle = async (req, res) => {
    const detalle = this.helpers.createDetalle(req.body);
    const result = await this.db.addDetalle(detalle);
    res.json(result);
  };

  modifyDetalle = async (req, res) => {
    const detalle = this.helpers.createDetalle(req.body);
    const result = await this.db.updateDetalle(detalle);
    res.json(result);
  };

  deleteDetalle = async (req, res) => {
    const { id } = req.params;
    const result = await this.db.deleteDetalle(id);
    res.json(result);
  };
}