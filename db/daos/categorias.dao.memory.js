import categoriasMock from '../mocks/categorias.mock.js'


export default class CategoriasDaoMemory {
  constructor() {
    this.categorias = categoriasMock;
  }

  getAllCategorias() {
    return this.categorias;
  }

  getCategoriaById(id) {
    const categoria = this.categorias.find((categoria) => categoria.id_categoria === parseInt(id));
    return categoria;
  }

  getCategoriasByName(name) {
    const result = this.users.filter((categoria) =>
      categoria.nombre_categoria.toLowerCase().includes(name.toLowerCase())
    );
    return result;
  }

  addUser(categoria) {
    this.categorias.push(categoria);
    return true;
  }

  updateCategoria(data) {
    let modifiedCategoria = null;
    this.categorias = this.categorias.map((categoria) => {
      if (categoria.id_categoria === data.id_categoria) {
        modifiedCategoria = data;
        return data;
      }
      return categoria;
    });
    return modifiedCategoria;
  }

  deleteCategoria(id) {
    const idNum = parseInt(id);
    const found = this.categorias.some((categoria) => categoria.id_categoria === idNum);
    if (found) {
      this.categorias = this.categorias.filter((categoria) => categoria.id_categoria !== idNum);
    }
    return found;
  }
}