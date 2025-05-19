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

  if (!id_usuario || !carrito || carrito.length === 0) {
    return res.status(400).json({ message: "Datos de pedido incompletos" });
  }

  try {
    const id_pedido = await createOrder(id_usuario, carrito); // función en orderModel.js
    res.json({ success: true, id_pedido });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ success: false, message: "Error al crear pedido" });
  }
};
