import Routes from "./routes.js";
import OrdenesControllers from "../controllers/ordenes.controllers.js";

export default class OrdenesRoutes extends Routes {

    constructor() {
        super()
        this.controller = new OrdenesControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getOrdenes)                          
            .get('/:id', this.controller.getOrdenById)       
            .post('/', this.controller.addOrden)
            .put('/:id', this.controller.modifyOrden)
            .delete('/:id', this.controller.deleteOrden)
    }
}
