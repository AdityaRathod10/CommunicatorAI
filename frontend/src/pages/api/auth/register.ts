import type { NextApiRequest, NextApiResponse } from 'next'
import { registerUser } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long' 
      })
    }

    // Register user
    const user = await registerUser(email, password, name)

    // Remove sensitive information
    const { passwordHash, ...userWithoutPassword } = user

    res.status(201).json(userWithoutPassword)
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.code === 'P2002' || error.message.includes('unique constraint')) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    res.status(500).json({ 
      error: error.message || 'Registration failed' 
    })
  }
}