import axios from 'axios';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import UsersRoutes from '../routes/users.routes.js';
import DireccionesRoutes from '../routes/direcciones.routes.js';
import ProductsRoutes from '../routes/products.routes.js';
import DetallesRoutes from '../routes/detalles.routes.js';
import OrdenesRoutes from "../routes/ordenes.routes.js";
import CategoriasRoutes from "../routes/categorias.routes.js";
import PagosRoutes from "../routes/pagos.routes.js";
import Login from "../models/Login.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Server {

    static app = express();

    static middlewares() {
        Server.app.use(cors());
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: true }));

        // ✅ Servir archivos estáticos desde la carpeta "public"
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

        // ✅ Login
        Server.app.post('/api/login', async (req, res) => {
            const { email, password } = req.body;
            const user = new Login(email, password);
            const result = await user.autenticar();
            res.json(result);
        });

        // ✅ Registro
        Server.app.post('/api/register', async (req, res) => {
            const { email, password } = req.body;
            const user = new Login(email, password);
            const result = await user.nuevo_usuario();
            res.json(result);
        });

        // ✅ Chatbot IA usando Ollama
        Server.app.post('/api/chatbot', async (req, res) => {
            const { mensaje } = req.body;

            if (!mensaje) {
                return res.status(400).json({ error: 'No se recibió ningún mensaje' });
            }

            try {
                const respuesta = await axios.post('http://localhost:11434/api/generate', {
                    model: 'gemma:2b', // ✅ Modelo válido de Ollama
                    prompt: mensaje,
                    stream: false
                });

                res.json({ respuesta: respuesta.data.response });

            } catch (error) {
                console.error('❌ Error al conectar con Ollama:', error.message);
                if (error.response?.data) console.error('🧪 Detalle:', error.response.data);
                res.status(500).json({ error: 'Error al generar respuesta con IA' });
            }
        });

        // ✅ Ruta raíz
        Server.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }

    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`🚀 Servidor escuchando en http://localhost:${port}`)
        );
    }

    static run(port) {
        Server.middlewares();
        Server.routes();
        Server.runServer(port);
    }
}
