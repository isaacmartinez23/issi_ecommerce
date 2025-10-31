// /api/login.js
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// ¡IMPORTANTE! Guarda tu secreto en las variables de entorno de Vercel
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    // 1. Buscar al usuario por email
    const result = await pool.query('SELECT * FROM Usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 2. Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3. Crear el JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      JWT_SECRET,
      { expiresIn: '1d' } // El token expira en 1 día
    );

    // 4. Enviar el token al cliente
    // (Por seguridad, puedes configurarlo como una cookie httpOnly)
    res.status(200).json({
      message: 'Login exitoso',
      token: token,
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}