import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import UsersRoutes from '../routes/users.routes.js';
import ProductsRoutes from '../routes/products.routes.js';
import DetallesRoutes from '../routes/detalles.routes.js';

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
        const productsRoutes = new ProductsRoutes();
        const detallesRoutes = new DetallesRoutes();
        Server.app.use("/detalles", detallesRoutes.router);
        Server.app.use('/users', usersRoutes.router);
        Server.app.use('/products', productsRoutes.router);

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
