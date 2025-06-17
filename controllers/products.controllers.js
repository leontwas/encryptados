import ProductsHelpers from "../helpers/products.helpers.js";
import ProductsDaoMemory from '../db/daos/products.dao.memory.js'
import ProductsDaoMysql from '../db/daos/products.dao.mysql.js'


export default class ProductsControllers {

    constructor() {
        this.db = new ProductsDaoMemory()
        this.db = new ProductsDaoMysql()
        this.helpers = new ProductsHelpers()
    }


    getProducts = async (req, res) => {
        const products = await this.db.getAllProducts()
        res.json(products) 
    }


    getProductById = async (req, res) => {
        const { id } = req.params
        const product = await this.db.getProductById(id)
        res.json(product)
    }


    getProductsByName = async (req, res) => {
        const { name } = req.query
        const result = await this.db.getProductsByName(name)
        res.json(result)
    }


    addProduct = async (req, res) => {
        const product = this.helpers.createProduct(req.body)
        const result = await this.db.addProduct(product)
        res.json(result)
    }


    modifyProduct = async (req, res) => {
        const product = this.helpers.createPoduct(req.body)
        const result = await this.db.modifyProduct(product)
        res.json(result)
    }


    deleteProduct = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteProducts(id)
        res.json(result)
    }
}