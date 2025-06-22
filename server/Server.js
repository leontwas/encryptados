import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import UsersRoutes from '../routes/users.routes.js';
import DireccionesRoutes from '../routes/direcciones.routes.js';
import ProductsRoutes from '../routes/products.routes.js';
import DetallesRoutes from '../routes/detalles.routes.js';
import OrdenesRoutes from "../routes/ordenes.routes.js";
import CategoriasRoutes from "../routes/categorias.routes.js";
import PagosRoutes from "../routes/pagos.routes.js";    

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Server {

    static app = express();

    static middlewares() {
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: true }));

        // ✅ Middleware para servir archivos estáticos desde la carpeta "public"
        Server.app.use(express.static(path.join(__dirname, '../public')));
    }

    static routes() {
        const usersRoutes = new UsersRoutes();
        const direccionesRoutes = new DireccionesRoutes();
        const ordenesRoutes = new OrdenesRoutes();
        const categoriasRoutes = new CategoriasRoutes();
        const productsRoutes = new ProductsRoutes();
        const detallesRoutes = new DetallesRoutes();
        const pagosRoutes = new PagosRoutes();
        Server.app.use('/users', usersRoutes.router);
        Server.app.use('/direcciones', direccionesRoutes.router);
        Server.app.use("/ordenes", ordenesRoutes.router);
        Server.app.use("/categorias", categoriasRoutes.router);  
        Server.app.use('/products', productsRoutes.router);
        Server.app.use("/detalles", detallesRoutes.router);
        Server.app.use("/pagos", pagosRoutes.router);  

        // ✅ Ruta específica para servir index.html
        Server.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }

    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`Servidor escuchando en http://localhost:${port}`)
        );
    }

    static run(port) {
       // console.clear();
        Server.middlewares();
        Server.routes();
        Server.runServer(port);
    }
}
