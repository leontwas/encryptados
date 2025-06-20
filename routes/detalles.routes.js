import Routes from "./routes.js";
import DetallesControllers from "../controllers/detalles.controllers.js";

export default class DetallesRoutes extends Routes {

    constructor() {
        super()
        this.controller = new DetallesControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getDetalles)
            .get('/:id', this.controller.getDetalleById)
            .post('/', this.controller.addDetalle)
            .put('/:id', this.controller.modifyDetalle)
            .delete('/:id', this.controller.deleteDetalle)
    }
}
