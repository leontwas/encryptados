import Routes from "./routes.js";
import PagosControllers from "../controllers/pagos.controllers.js";

export default class PagosRoutes extends Routes {

    constructor() {
        super()
        this.controller = new PagosControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .get('/', this.controller.getPagos)              
            .get('/:id', this.controller.getPagoById)       
            .post('/', this.controller.addPago)
            .put('/:id', this.controller.modifyPago)
            .delete('/:id', this.controller.deletePago)
    }
}
