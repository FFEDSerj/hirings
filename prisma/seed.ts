import { PrismaClient } from '@prisma/client'
import { HIRINGS } from './../data/hirings';
import { COMPANIES } from './../data/companies';
import { ADDRESSES } from "../data/addresses";

const prisma = new PrismaClient()

async function main() {
  await prisma.address.createMany({data: ADDRESSES})

  await prisma.company.createMany({data: COMPANIES})
  
  await prisma.hiring.createMany({data: HIRINGS})
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })