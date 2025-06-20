import productsMock from '../mocks/products.mock.js'


export default class ProductsDaoMemory {
  constructor() {
    this.products = productsMock;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(
      (product) => product.id_producto === parseInt(id)
    );
    return product;
  }

  getProductsByName(name) {
    const result = this.products.filter((product) =>
      product.nombre_producto.toLowerCase().includes(name.toLowerCase())
    );
    return result;
  }

  addProduct(product) {
    this.products.push(product);
    return true;
  }

  updateProduct(data) {
    let modifiedProduct = null;
    this.products = this.products.map((product) => {
      if (product.id_producto === data.id_producto) {
        modifiedProduct = data;
        return data;
      }
      return product;
    });
    return modifiedProduct;
  }

  deleteProduct(id) {
    const idNum = parseInt(id);
    const found = this.products.some((product) => product.id_producto === idNum);  
  if (found) {
      this.products = this.products.filter((product) => product.id_producto !== idNum);
    }
  return found;
  }
}