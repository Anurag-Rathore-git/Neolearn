import React from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
                <h2 className="ml-2 text-lg font-semibold text-gray-900">Shopping Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start adding courses to your cart
                </p>
                <div className="mt-6">
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={onClose}
                  >
                    Browse Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start border-b border-gray-200 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.instructor.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>Rs.{state.subtotal.toFixed(2)}</span>
              </div>
              {state.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 mb-2">
                  <span>Discount</span>
                  <span>Rs.{(state.subtotal * state.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <span>Total</span>
                <span>Rs.{state.total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Checkout
              </button>
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="mt-2 w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}