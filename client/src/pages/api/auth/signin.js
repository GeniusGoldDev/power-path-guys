
import { compare } from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Find the user in the database
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Sign in successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}