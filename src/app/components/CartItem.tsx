import React from "react";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => {
  return (
    <div className="cart-item">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Quantity: {quantity}</p>
    </div>
  );
};

export default CartItem;
