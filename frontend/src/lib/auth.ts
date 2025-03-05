import bcrypt from 'bcrypt'
import { prisma } from './db'

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

// Password verification
export async function verifyPassword(
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

// User registration
export async function registerUser(
  email: string, 
  password: string, 
  name: string
) {
  // Check if user already exists
  const existingUser = await prisma.Users.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  // Hash password
  const passwordHash = await hashPassword(password)

  // Create user
  return await prisma.Users.create({
    data: {
      email,
      name,
      passwordHash
    }
  })
}

// Get all users
export async function getAllUsers() {
  try {
    const users = await prisma.Users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc' // Optional: order by most recent first
      }
    })

    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Unable to retrieve users')
  }
}

// Optional: Get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.Users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw new Error('Unable to retrieve user')
  }
}

// User login
export async function loginUser(email: string, password: string) {
  // Find user by email (corrected model name to users)
  const user = await prisma.users.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Verify password
  const isPasswordValid = await verifyPassword(
    password, 
    user.passwordHash
  )

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  // Return user without password hash
  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}