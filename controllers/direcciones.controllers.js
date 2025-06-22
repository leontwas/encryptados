import DireccionesHelpers from '../helpers/direcciones.helpers.js'
import DireccionesDaoMemory from "../db/daos/direcciones.dao.memory.js";
import DireccionesDaoMysql from '../db/daos/direcciones.dao.mysql.js'


export default class DireccionesControllers {

    constructor() {
       // this.db = new DireccionesDaoMemory()
        this.db = new DireccionesDaoMysql()
        this.helpers = new DireccionesHelpers()
    }


    getDirecciones = async (req, res) => {
        const direcciones = await this.db.getAllDirecciones()
        res.json(direcciones)
    }


    getDireccionById = async (req, res) => {
        const { id } = req.params
        const direccion = await this.db.getDireccionById(id)
        res.json(direccion)
    }

  addDireccion = async (req, res) => {
    try {
      const direccionData = this.helpers.createDireccion(req.body);
      const result = await this.db.addDireccion(direccionData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  modifyDireccion = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID de dirección inválido" });
      }
      const direccionBody = this.helpers.createDireccion(req.body);
      const direccionData = { id_direccion: Number(id), ...direccionBody };
      const result = await this.db.modifyDireccion(direccionData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


    deleteDireccion = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteDireccion(id)
        res.json(result)
    }
}