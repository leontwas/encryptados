import mysql from 'mysql2/promise'; // Usamos el cliente 'promise' para await/async
import config from '../config/mysql.config.js';

export default class Mysql {
    constructor() {
        this.connection = null; // La conexión se inicializa después de crear la DB
    }

    // 👉 Método principal para inicializar conexión: crea DB y conecta
    async initialize() {
        await this.#createDatabase();
        await this.#connectToDatabase();
    }

    // 🔸 Crea la base de datos si no existe
    async #createDatabase() {
        const { host, user, password, database } = config;

        try {
            const connection = await mysql.createConnection({ host, user, password });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
            console.log(`✅ Base de datos '${database}' verificada o creada correctamente`);
            await connection.end();
        } catch (error) {
            console.error('❌ Error al crear la base de datos:', error);
            throw error;
        }
    }

    // 🔸 Conecta a la base de datos ya existente o recién creada
    async #connectToDatabase() {
        try {
            this.connection = await mysql.createConnection({
                ...config,
                multipleStatements: true, // por si necesitas ejecutar varias sentencias en un solo query
            });
            console.log('✅ Conectado a la base de datos MySQL');
        } catch (error) {
            console.error('❌ No se pudo conectar a la base de datos MySQL:', error);
            throw error;
        }
    }

    // 👉 Método para ejecutar consultas SQL
    async execute(sql, params = []) {
        try {
            const [results] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('❌ Error al ejecutar consulta:', error);
            throw error;
        }
    }
}
