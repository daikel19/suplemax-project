import { getConnection } from '../db.js';

export const getCategorias = async (req, res) => {
  try {
    const db = await getConnection();

    const [categorias] = await db.execute("SELECT * FROM categorias");
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
