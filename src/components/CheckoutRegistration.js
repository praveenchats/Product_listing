import React, { useState } from 'react';

const CheckoutRegistration = ({ handleCheckout }) => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterCheckout = () => {
    setIsSuccess(true);
    handleCheckout();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Register and Checkout</h2>
      {isSuccess ? (
        <div className="text-green-600 font-bold mb-4">
          Registration and checkout completed successfully!
        </div>
      ) : null}
      <form>
        <div className="mb-4">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={registrationData.firstName}
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
            value={registrationData.lastName}
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
            value={registrationData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleRegisterCheckout}
        >
          Place Order (Register and Checkout)
        </button>
      </form>
    </div>
  );
};

export default CheckoutRegistration;
