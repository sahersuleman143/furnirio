// src/app/api/place-order.js (Node.js backend)
import { connectToDatabase } from '../../../utils/db'; // MongoDB connection file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order, shipping } = req.body;
    
    if (!order || !shipping) {
      return res.status(400).json({ success: false, message: 'Order and shipping details are required.' });
    }

    try {
      // Connect to the database
      const db = await connectToDatabase();

      // Save order and shipping details
      const result = await db.collection('orders').insertOne({
        order,
        shipping,
        status: 'pending',
        createdAt: new Date(),
      });

      res.status(200).json({ success: true, message: 'Order placed successfully', orderId: result.insertedId });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
