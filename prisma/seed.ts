import { PrismaClient } from '@prisma/client';
import { COMPANIES } from '../data/companies';

const prisma = new PrismaClient();

async function main() {
  for (const company of COMPANIES) {
    await prisma.company.create({ data: company });
  }
}
main()
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
