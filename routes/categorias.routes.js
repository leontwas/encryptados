import Routes from "./routes.js";
import CategoriasControllers from "../controllers/categorias.controllers.js";

export default class UsersRoutes extends Routes {

    constructor() {
        super()
        this.controller = new CategoriasControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getCategorias)              
            .get('/search', this.controller.getCategoriasByName)   
            .get('/:id', this.controller.getCategoriaById)       
            .post('/', this.controller.addCategoria)
            .put('/:id', this.controller.modifyCategoria)
            .delete('/:id', this.controller.deleteCategoria)
    }
}