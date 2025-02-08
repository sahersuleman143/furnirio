// src/app/components/PlaceOrderButton.tsx
import React, { useState } from 'react';

const PlaceOrderButton = ({ orderData }) => {
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    postalCode: '',
  });

  const handleShippingDetailsChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: orderData, shipping: shippingDetails }),
      });
      const data = await response.json();
      if (data.success) {
        // Show success message or redirect to order confirmation page
      } else {
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleShippingDetailsChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingDetailsChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={shippingDetails.postalCode}
            onChange={handleShippingDetailsChange}
          />
        </label>
      </form>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default PlaceOrderButton;
