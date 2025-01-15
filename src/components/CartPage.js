import React, { useState } from 'react';
import { productData } from './Data/ProductData'; 

function CartPage() {
  const [cart, setCart] = useState(
    productData.slice(0, 5)
  );

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => {
        const price = item.price.replace('₹', '').replace(',', '').trim();
        return total + parseFloat(price);
      }, 0)
      .toFixed(5);
  };
  
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex border-b border-gray-200 py-4 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 object-cover rounded"
                />
                <div className="flex-grow px-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Eligible for FREE Shipping
                  </p>
                </div>
                <p className="font-bold text-gray-800">{product.price}</p>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-gray-100 shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Subtotal</h2>
            <p className="text-gray-700">
              Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''}):{' '}
              <span className="font-bold">₹{calculateSubtotal()}</span>
            </p>
            <p className="text-gray-500 mt-2">
              Add items worth ₹{Math.max(0, 499 - calculateSubtotal())} for FREE
              Delivery
            </p>
            <button className="bg-yellow-500 text-black font-bold w-full py-2 rounded mt-4 hover:bg-yellow-600">
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
