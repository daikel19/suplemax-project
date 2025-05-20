import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem("carrito");
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);


    const añadirProducto = (producto, cantidad) => {
        setCarrito(prev => {
            const existente = prev.find(p => p.id === producto.id);
            if (existente) {
                return prev.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
                );
            }
            return [...prev, { ...producto, cantidad }];
        });
    };

    const eliminarProducto = (id) => {
        setCarrito(prev => prev.filter(p => p.id !== id));
    };

    const clearCart = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider value={{ carrito, añadirProducto, eliminarProducto, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
