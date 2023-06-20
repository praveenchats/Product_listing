import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleRemoveFromCart = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex)
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const totalItems = cartItems.length;

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              <h3 className="text-xs font-semibold mb-2">{item.title}</h3>
              <div className="aspect-w-3 aspect-h-2 mb-2">
                <div className="bg-gray-200 rounded-md overflow-hidden h-[20rem]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-[20rem]"
                  />
                </div>
              </div>
              <p className="text-gray-700 mb-2">Price: ${item.price}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 mb-6">
            <p className="text-lg">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-lg">
              Total Amount: <span className="font-bold">${totalPrice}</span>
            </p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
