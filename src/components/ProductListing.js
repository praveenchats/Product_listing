import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import api from '../services/api';
import './cart.css';
import CheckoutGuest from './CheckoutGuest';
import CheckoutRegistration from './CheckoutRegistration';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          let url = '/products';
          if (sortBy) {
            url += `?sort=${sortBy}`;
          }
          const response = await api.get(url);
          const sortedProducts = response.data.sort((a, b) => {
            if (sortBy === 'name') {
              return a.title.localeCompare(b.title);
            } else if (sortBy === 'price') {
              return a.price - b.price;
            }
            return 0; // Default case
          });
          setProducts(sortedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

    fetchProducts();
  }, [sortBy]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setOrderPlaced(false);
  };

  const handleRemoveFromCart = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex)
    );
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setOrderPlaced(true);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const totalItems = cartItems.length;

  const handleGuestCheckout = () => {
    setCheckoutComplete(true);
    setOrderPlaced(true);
    setCartItems([]);
  };

  const handleRegisterCheckout = () => {
    setCheckoutComplete(true);
    setOrderPlaced(true);
    setCartItems([]);
  };

  return (
    <div>
      {checkoutComplete ? (
        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Order Placed Successfully!
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Cart</h2>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cartItems.map((item, index) => (
              <CSSTransition key={index} timeout={300} classNames="cart-item">
                <div className="cart-im border p-4 rounded-md shadow-md">
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
              </CSSTransition>
            ))}
          </TransitionGroup>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleCheckout}
          >
            Place Order (Cash on Delivery)
          </button>
          <div className="flex justify-between items-center mt-4 mb-6">
            <p className="text-lg">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-lg">
              Total Amount: <span className="font-bold">${totalPrice}</span>
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-4">Product Listing</h2>
          <div className="mb-4">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="ml-2"
            >
              <option value="">None</option>
              <option value="name">Name (A to Z)</option>
              <option value="price">Price (Lowest to Highest)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-md shadow-md bg-[#deeef4]"
              >
                <div className="aspect-w-3 aspect-h-4 mb-2">
                  <div className="bg-gray-200 rounded-md overflow-hidden h-[20rem]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[20rem]"
                    />
                  </div>
                </div>
                <h3 className="text-xs font-bold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/checkout/guest">
        <CheckoutGuest handleCheckout={handleRegisterCheckout} />
      </Link>
      <Link to="/checkout/registration">
        <CheckoutRegistration handleCheckout={handleRegisterCheckout} />
      </Link>
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Checkout</h2>
        <p>Please select a checkout method:</p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/checkout/registration')}
        >
          Checkout as Guest
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/checkout/registration')}
        >
          Register and Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
