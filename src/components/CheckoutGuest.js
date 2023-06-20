import React, { useState } from 'react';

const CheckoutGuest = ({ handleCheckout }) => {
  const [guestData, setGuestData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuestCheckout = () => {
    handleCheckout();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Checkout as Guest</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={guestData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={guestData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={guestData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleGuestCheckout}
        >
          Place Order (Guest Checkout)
        </button>
      </form>
    </div>
  );
};

export default CheckoutGuest;
