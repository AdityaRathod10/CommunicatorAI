import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllClients } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clients = await getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching clients', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}