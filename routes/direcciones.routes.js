import Routes from "./routes.js";
import DireccionesControllers from "../controllers/direcciones.controllers.js";

export default class DireccionesRoutes extends Routes {

    constructor() {
        super()
        this.controller = new DireccionesControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getDirecciones)
            .get('/:id', this.controller.getDireccionById)
            .post('/', this.controller.addDireccion)
            .put('/:id', this.controller.modifyDireccion)
            .delete('/:id', this.controller.deleteDireccion)
    }
}