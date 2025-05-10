import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';

interface CartContextType {
  items: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  clearCart: () => void;
  isInCart: (courseId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Course[]>([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      setItems(prev => [...prev, course]);
    }
  };

  const removeFromCart = (courseId: number) => {
    setItems(prev => prev.filter(item => item.id !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: number) => {
    return items.some(item => item.id === courseId);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 