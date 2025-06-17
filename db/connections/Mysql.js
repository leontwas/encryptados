import mysql from 'mysql2';
import config from '../config/mysql.config.js';

export default class Mysql {
    constructor() {
        this.connection = mysql.createConnection(config);
        this.tryConnection();
    }

    tryConnection() {
        this.connection.connect(err => {
            err
                ? console.error('No se pudo conectar a la Base de Datos MySQL')
                : console.log('Conectado a la Base de Datos MySQL');
        });
    }

    execute(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}
