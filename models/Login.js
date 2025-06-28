import bcrypt from 'bcrypt';
import db from './db.js'; // o '../db.js' según dónde lo pongas

export default class Login {
  #pwd;

  constructor(email, password) {
    this.email = email;
    this.#pwd = password;
  }

  async autenticar() {
    if (!this.email || !this.#pwd) {
      return { success: false, message: 'Email y contraseña requeridos' };
    }

    try {
      const rows = await db.execute(
        'SELECT nombre_usuario, pass FROM usuario WHERE nombre_usuario = ?',
        [this.email]
      );

      if (rows.length === 0) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      const pwdHash = rows[0].pwd_usuario;
      const match = await bcrypt.compare(this.#pwd, pwdHash);

      if (match) {
        return { success: true, message: 'Login exitoso', user: this.email };
      } else {
        return { success: false, message: 'Contraseña incorrecta' };
      }

    } catch (error) {
      console.error('Error en autenticar():', error);
      return { success: false, message: 'Error del servidor', error };
    }
  }

  async nuevo_usuario() {
    if (!this.email || !this.#pwd) {
      return { success: false, message: 'Email y contraseña requeridos' };
    }

    try {
      const existing = await db.execute(
        "SELECT id_usuario FROM usuario WHERE nombre_usuario = ?",
        [this.email]
      );

      if (existing.length > 0) {
        return { success: false, message: 'El usuario ya existe' };
      }

      const hash = await bcrypt.hash(this.#pwd, 10);
      await db.execute(
        'INSERT INTO usuario (nombre_usuario, pwd_usuario) VALUES (?, ?)',
        [this.email, hash]
      );

      return { success: true, message: 'Usuario registrado con éxito' };

    } catch (error) {
      console.error('Error en nuevo_usuario():', error);
      return { success: false, message: 'Error del servidor', error };
    }
  }
}
