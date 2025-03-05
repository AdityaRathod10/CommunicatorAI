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
  const user = await prisma.Users.findUnique({
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


export async function getAllClients() {
  try {
    const clients = await prisma.Clients.findMany({
      select: {
        id: true,
        name: true,
        // Add other client fields as needed
      },
    })

    return clients
  } catch (error) {
    console.error('DETAILED ERROR in getAllClients:', error);
    
    // More specific error handling
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }
    throw new Error(`Unable to retrieve clients: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}