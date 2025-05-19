import db from '../db.js';

// Obtener todos los productos o filtrados por categoría
export const getProducts = async (req, res) => {
  const { categoria } = req.query;

  try {
    let query = `
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id
    `;
    const params = [];

    if (categoria) {
      query += ' WHERE c.nombre = ?';
      params.push(categoria);
    }

    const [productos] = await db.execute(query, params);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
