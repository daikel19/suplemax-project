import db from '../db.js';

export const obtenerPedidosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    // 1. Obtener pedidos del usuario
    const [pedidos] = await db.execute(
      `SELECT id, total, estado, fecha FROM pedidos WHERE id_usuario = ? ORDER BY fecha DESC`,
      [id_usuario]
    );

    // 2. Para cada pedido, obtener sus productos
    const pedidosConDetalles = await Promise.all(
      pedidos.map(async (pedido) => {
        const [detalles] = await db.execute(
          `SELECT pd.id_producto, pd.cantidad, pd.precio_unitario, p.nombre 
           FROM pedido_detalles pd
           JOIN productos p ON pd.id_producto = p.id
           WHERE pd.id_pedido = ?`,
          [pedido.id]
        );
        return { ...pedido, productos: detalles };
      })
    );

    res.json({ success: true, pedidos: pedidosConDetalles });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
