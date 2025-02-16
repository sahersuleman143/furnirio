import React from "react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void; // ✅ Remove function add kiya
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onRemove }) => {
  return (
    <div className="cart-item">
      <h3>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
      <p>Total: ${(price * quantity).toFixed(2)}</p>
      <button className="remove-item-btn" onClick={() => onRemove(id)}>Remove</button> {/* ✅ Remove button */}
    </div>
  );
};

export default CartItem;
