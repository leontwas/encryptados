import UsersHelpers from '../helpers/users.helpers.js'
import UsersDaoMemory from '../db/daos/users.dao.memory.js'
import UsersDaoMysql from '../db/daos/users.dao.mysql.js'


export default class UsersControllers {

    constructor() {
       // this.db = new UsersDaoMemory()
        this.db = new UsersDaoMysql()
        this.helpers = new UsersHelpers()
    }


    getUsers = async (req, res) => {
        const users = await this.db.getAllUsers()
        res.json(users)
    }


    getUserById = async (req, res) => {
        const { id } = req.params
        const user = await this.db.getUserById(id)
        res.json(user)
    }


    getUsersByName = async (req, res) => {
    try {
        const { nombre_usuario } = req.query;
        if (!nombre_usuario) {
            return res.status(400).json({ error: "Debes enviar el nombre_usuario por query string" });
        }
        const result = await this.db.getUsersByName(nombre_usuario);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


  addUser = async (req, res) => {
    try {
      const userData = this.helpers.createUser(req.body);
      const result = await this.db.addUser(userData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  modifyUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const userBody = this.helpers.createUser(req.body);
      const userData = { id_usuario: Number(id), ...userBody };
      const result = await this.db.modifyUser(userData);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


    deleteUser = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteUser(id)
        res.json(result)
    }
}