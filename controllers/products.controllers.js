import ProductsHelpers from "../helpers/products.helpers.js";
import ProductsDaoMemory from "../db/daos/products.dao.memory.js";
import ProductsDaoMysql from "../db/daos/products.dao.mysql.js";

export default class ProductsControllers {
  constructor() {
    //this.db = new ProductsDaoMemory();
    this.db = new ProductsDaoMysql();
    this.helpers = new ProductsHelpers();
  }

  getProducts = async (req, res) => {
    const products = await this.db.getAllProducts();
    res.json(products);
  };

  getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await this.db.getProductById(id);
    res.json(product);
  };

  getProductsByName = async (req, res) => {
    try {
      const { nombre_producto } = req.query;
      if (!nombre_producto) {
        return res
          .status(400)
          .json({ error: "Debes enviar el nombre_producto por query string" });
      }
      const result = await this.db.getProductsByName(nombre_producto);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  };

  addProduct = async (req, res) => {
    const product = this.helpers.createProduct(req.body);
    const result = await this.db.addProduct(product);
    res.json(result);
  };

  modifyProduct = async (req, res) => {
    const product = this.helpers.createProduct(req.body);
    const result = await this.db.updateProduct(product);
    res.json(result);
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const result = await this.db.deleteProduct(id);
    res.json(result);
  };
}