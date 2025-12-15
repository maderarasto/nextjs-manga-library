import {PrismaPg} from "@prisma/adapter-pg";
import {Prisma, PrismaClient} from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter
});

const genreData: Prisma.GenreCreateInput[] = [
  { name: 'Action' },
  { name: 'Adventure' },
  { name: 'Sci-fi' },
  { name: 'Thriller' },
  { name: 'Zombie' },
];

export async function main() {
  for (const genre of genreData) {
    await prisma.genre.create({
      data: genre,
    });
  }
}

main();