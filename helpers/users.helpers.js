import User from '../models/User.js'

export default class UsersHelpers {

    createUser(newData) {
        const { id_usuario, nombre_usuario, email, pass } = newData
        const user = new User(parseInt(id_usuario), nombre_usuario, email, pass)
        return user
    }
}