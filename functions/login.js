import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [
    { username: "yo", password: bcrypt.hashSync("yo", 10) },
    { username: "superAdmin", password: bcrypt.hashSync("superAdmin123", 10) },
];

export async function handler(event) {
    try {
        const { username, password } = JSON.parse(event.body);

        // Verifica si el usuario existe
        const user = users.find((u) => u.username === username);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Usuario no encontrado" }),
            };
        }

        // Verifica la contraseña
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Contraseña incorrecta" }),
            };
        }

        // Genera el token JWT
        const token = jwt.sign({ username: user.username }, "secreto-super-seguro", {
            expiresIn: "1h",
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor" }),
        };
    }
}
