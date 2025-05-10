import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Course } from '../../types/course';

interface CartItem extends Course {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
  discount: number;
  subtotal: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' };

const initialState: CartState = {
  items: [],
  coupon: null,
  discount: 0,
  subtotal: 0,
  total: 0,
};

const calculateTotals = (items: CartItem[], discount: number) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - (subtotal * discount);
  return { subtotal, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const { subtotal, total } = calculateTotals(newItems, state.discount);
      return { ...state, items: newItems, subtotal, total };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { subtotal, total } = calculateTotals(newItems, state.discount);
      return { ...state, items: newItems, subtotal, total };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'APPLY_COUPON': {
      // Simplified coupon logic - in real app, validate with backend
      const discount = action.payload === 'NEWYEAR' ? 0.2 : 0;
      const { subtotal, total } = calculateTotals(state.items, discount);
      return {
        ...state,
        coupon: action.payload,
        discount,
        subtotal,
        total,
      };
    }

    case 'REMOVE_COUPON': {
      const { subtotal, total } = calculateTotals(state.items, 0);
      return {
        ...state,
        coupon: null,
        discount: 0,
        subtotal,
        total,
      };
    }

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart state to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      Object.assign(initialState, parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};