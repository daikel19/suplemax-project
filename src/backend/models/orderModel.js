import { getConnection } from '../db.js';

export const getOrdersByUser = async (id_usuario) => {
  const db = await getConnection();
  const [orders] = await db.execute(
    'SELECT * FROM pedidos WHERE id_usuario = ? ORDER BY fecha DESC',
    [id_usuario]
  );
  return orders;
};

export const getOrderDetails = async (id_pedido) => {
  const db = await getConnection();
  const [details] = await db.execute(
    `SELECT d.*, p.nombre FROM pedido_detalles d
     JOIN productos p ON d.id_producto = p.id
     WHERE d.id_pedido = ?`,
    [id_pedido]
  );
  return details;
};

export const createOrder = async (id_usuario, carrito) => {
  const db = await getConnection();
  const total = carrito.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);

  const [orderResult] = await db.execute(
    'INSERT INTO pedidos (id_usuario, total) VALUES (?, ?)',
    [id_usuario, total]
  );
  const id_pedido = orderResult.insertId;

  for (const item of carrito) {
    await db.execute(
      'INSERT INTO pedido_detalles (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_pedido, item.id_producto, item.cantidad, item.precio_unitario]
    );
  }

  return id_pedido;
};
