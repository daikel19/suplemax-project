import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../models/userModel.js';

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await createUser({ nombre, email, password: hashedPassword });

    return res.json({
      success: true,
      message: 'Registro exitoso',
      usuario: { id, nombre, email, rol: 'cliente' },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al registrar', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await findUserByEmail(email);
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    return res.json({
      success: true,
      message: 'Inicio de sesión correcto',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
};
