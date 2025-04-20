import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: { email, name },
  });
}

async function createRider(title: string, name: string) {
  return await prisma.riders.create({
    data: { title, name },
  });
}

async function createUserRider(userID: number, riderId: number, rank: number) {
  return await prisma.userRiders.create({
    data: { userID, riderId, rank },
  });
}

async function main() {
  const user = await createUser('example@example.com', 'John Wick');
  const rider = await createRider('Cyclist', 'Tadej Pogacar');
  const userRider = await createUserRider(user.id, rider.id, 1);

  console.log('Created User:', user);
  console.log('Created Rider:', rider);
  console.log('Created UserRider:', userRider);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
