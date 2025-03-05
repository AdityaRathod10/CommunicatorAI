// pages/api/get-users.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllUsers } from '@/lib/auth'  // Import the function from auth.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
