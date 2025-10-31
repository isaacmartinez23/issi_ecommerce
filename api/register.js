// /api/register.js
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Configura tu conexión a PostgreSQL (usa variables de entorno en Vercel)
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    // 1. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 2. Insertar en la base de datos
    const result = await pool.query(
      'INSERT INTO Usuarios (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, password_hash]
    );

    res.status(201).json({ 
      message: 'Usuario creado', 
      user: result.rows[0] 
    });

  } catch (error) {
    // Manejar error de email duplicado
    if (error.code === '23505') { 
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}