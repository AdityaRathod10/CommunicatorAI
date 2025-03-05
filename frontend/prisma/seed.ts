import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Agency Workers (Users)
const agencyWorkers = [
  { 
    name: 'Rajesh Sharma', 
    email: 'rajesh.sharma@realestate.com',
    role: 'ADMIN'
  },
  { 
    name: 'Priya Patel', 
    email: 'priya.patel@realestate.com',
    role: 'USER'
  },
  { 
    name: 'Vikram Singh', 
    email: 'vikram.singh@realestate.com',
    role: 'USER'
  },
  { 
    name: 'Anjali Reddy', 
    email: 'anjali.reddy@realestate.com',
    role: 'USER'
  },
  { 
    name: 'Amit Gupta', 
    email: 'amit.gupta@realestate.com',
    role: 'USER'
  }
]

// Clients data
const clientsData = [
  {
    name: "Sahil Khan",
    propertyInterest: {
      type: "Residential",
      location: "Mumbai"
    }
  },
  {
    name: "Eden Charles",
    propertyInterest: {
      type: "Commercial",
      location: "Delhi"
    }
  },
  {
    name: "Akshat Sarraf",
    propertyInterest: {
      type: "Residential",
      location: "Bangalore"
    }
  },
  {
    name: "Rohan Mehra",
    propertyInterest: {
      type: "Villa",
      location: "Hyderabad"
    }
  },
  {
    name: "Priyanka Chopra",
    propertyInterest: {
      type: "Apartment",
      location: "Chennai"
    }
  }
]

async function main() {
  // Clear existing data in the correct order to avoid foreign key constraints
  await prisma.followUpTasks.deleteMany()
  await prisma.conversations.deleteMany()
  await prisma.propertyInterests.deleteMany()
  await prisma.clients.deleteMany()
  await prisma.users.deleteMany()

  // Create Users (Agency Workers)
  const createdUsers = await Promise.all(
    agencyWorkers.map(async (worker, index) => {
      return prisma.users.create({
        data: {
          email: worker.email,
          name: worker.name,
          passwordHash: await bcrypt.hash(`Worker${index + 1}Pass!`, 10),
          role: worker.role
        }
      })
    })
  )

  // Create Clients and Property Interests
  const createdClientsWithInterests = await Promise.all(
    clientsData.map(async (clientData) => {
      // Randomly assign a user
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)]
      
      // Create Client
      const client = await prisma.clients.create({
        data: {
          userId: randomUser.id,
          name: clientData.name  // Add this line
        }
      })

      // Create Property Interest for this client
      await prisma.propertyInterests.create({
        data: {
          clientId: client.id
        }
      })

      return { client, randomUser }
    })
  )

  // Create Conversations
  const conversations = await Promise.all(
    createdClientsWithInterests.map(({ client, randomUser }) => {
      return prisma.conversations.create({
        data: {
          userId: randomUser.id,
          clientId: client.id
        }
      })
    })
  )

  // Create Follow-Up Tasks
  const followUpTasks = await Promise.all(
    conversations.map((conversation) => {
      return prisma.followUpTasks.create({
        data: {
          userId: conversation.userId,
          conversationId: conversation.id
        }
      })
    })
  )

  console.log('Seed data created successfully!')
  console.log(`
    Created:
    - ${createdUsers.length} Agency Workers
    - ${createdClientsWithInterests.length} Clients
    - ${conversations.length} Conversations
    - ${followUpTasks.length} Follow-Up Tasks
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })