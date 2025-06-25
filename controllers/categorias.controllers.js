import CategoriasHelpers from '../helpers/categorias.helpers.js'
import CategoriasDaoMemory from '../db/daos/categorias.dao.memory.js'
import CategoriasDaoMysql from '../db/daos/categorias.dao.mysql.js'


export default class CategoriasControllers {

    constructor() {
       // this.db = new CategoriasDaoMemory()
        this.db = new CategoriasDaoMysql()
        this.helpers = new CategoriasHelpers()
    }


    getCategorias = async (req, res) => {
        const categorias = await this.db.getAllCategorias()
        res.json(categorias)
    }


    getCategoriaById = async (req, res) => {
        const { id } = req.params
        const categoria = await this.db.getCategoriaById(id)
        res.json(categoria)
    }


    getCategoriasByName = async (req, res) => {
    try {
        const { nombre_categoria } = req.query;
        if (!nombre_categoria) {
            return res.status(400).json({ error: "Debes enviar el nombre_categoria por query string" });
        }
        const result = await this.db.getCategoriasByName(nombre_categoria);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


  addCategoria = async (req, res) => {
    try {
      const categoriaData = this.helpers.createCategoria(req.body);
      const result = await this.db.addCategoria(categoriaData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  modifyCategoria = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID de categoría inválido" });
      }

      const categoriaBody = this.helpers.createCategoria(req.body);
      const categoriaData = { id_categoria: Number(id), ...categoriaBody };
      const result = await this.db.updateCategoria(categoriaData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


    deleteCategoria = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteCategoria(id)
        res.json(result)
    }
}