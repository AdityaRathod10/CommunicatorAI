import type { NextApiRequest, NextApiResponse } from 'next'
import { loginUser } from '@/lib/auth'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await loginUser(email, password)

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '1h' }
    )

    // Set HTTP-only cookie for better security
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`)
    res.status(200).json({ user: { id: user.id, email: user.email, name: user.name } })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(401).json({ 
      error: error.message || 'Login failed' 
    })
  }
}