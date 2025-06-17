import Mysql from '../connections/Mysql.js';


export default class ProductsDaoMysql extends Mysql {
  constructor() {
    super();
    this.table = "producto";
    this.#createTable();
  }

  #createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${this.table}(
        id_producto int(11) NOT NULL,
        nombre_producto varchar(50) NOT NULL,
        categoria_id int(11) NOT NULL,
        descripcion varchar(200) NOT NULL,
        precio int(7) NOT NULL,
        stock int(3) NOT NULL,
        image_url varchar(200) NOT NULL COMMENT 'URL de imagen del producto'
)`;

    this.connection.query(query);
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
    const result = await this.db.modifyProduct(product);
    res.json(result);
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const result = await this.db.deleteProduct(id);
    res.json(result);
  };
}