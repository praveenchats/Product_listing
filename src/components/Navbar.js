import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          My Store
        </Link>
        <div>
          <li>
              <Link to="/checkout">Checkout</Link>
            </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
