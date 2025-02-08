"use client";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  name: string;
  email: string;
  items: { product: string; price: number }[];
  total: number;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/get-orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Customer: {order.name} ({order.email})</p>
              <p>Total: ${order.total}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.product} - ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
