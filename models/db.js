import Mysql from '../db/connections/Mysql.js'; // adaptá si Mysql.js está en otro lugar

const db = new Mysql();
await db.initialize();

export default db;