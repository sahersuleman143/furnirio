"use client"; // 👈 Client Component

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/get-orders"); // 👈 Ensure API route is correct
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>Customer:</strong> {order.customerName || "N/A"} <br />
              <strong>Email:</strong> {order.email || "N/A"} <br />
              <strong>City:</strong> {order.city || "N/A"} <br />
              <strong>Items:</strong>
              <ul>
                {order.cartItems.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
              <strong>Total Amount:</strong> ${order.totalAmount} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
