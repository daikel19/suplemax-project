import { getConnection } from '../db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  console.log("📥 Datos recibidos en register:", { nombre, email, password });

  if (!nombre || !email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  try {
     const db = await getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    res.json({
      success: true,
      message: 'Registro exitoso',
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: 'cliente',
      },
    });
  } catch (error) {
    console.error("Error en registerUser:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });

  }
};

export const loginUser = async (req, res) => {
   
  const { email, password } = req.body;

  try {
    const db = await getConnection();
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    const usuario = rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, usuario.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    res.json({
      success: true,
      message: "Inicio de sesión correcto",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};
