import { getOrdersByUser, getOrderDetails, createOrder } from '../models/orderModel.js';

export const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.params.id_usuario);
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const detalles = await getOrderDetails(order.id);
        return { ...order, detalles };
      })
    );
    res.json(ordersWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
};

export const addOrder = async (req, res) => {
  const { id_usuario, carrito } = req.body;
  try {
    const id_pedido = await createOrder(id_usuario, carrito);
    res.json({ success: true, id_pedido });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear pedido', error });
  }
};
