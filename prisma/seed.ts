import {PrismaPg} from "@prisma/adapter-pg";
import {Prisma, PrismaClient} from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter
});

export async function main() {
  const userId = 'user_36phcWDDbpKaUQ2SFlGwP5ieo0e';

  // Genres
  const shonenGenre = await prisma.genre.create({ data: { name: 'Shonen' } });
  const actionGenre = await prisma.genre.create({ data: { name: 'Action' } });
  const adventureGenre = await prisma.genre.create({ data: { name: 'Adventure' } });
  const comedyGenre = await prisma.genre.create({ data: { name: 'Comedy' } });
  const fantasyGenre = await prisma.genre.create({ data: { name: 'Fantasy' } });
  const scifiGenre = await prisma.genre.create({ data: { name: 'Scifi' } });
  const thrillerGenre = await prisma.genre.create({ data: { name: 'Thriller' } });
  const horrorGenre = await prisma.genre.create({ data: { name: 'Horror' } });
  const darkFantasyGenre = await prisma.genre.create({ data: { name: 'Dark Fantasy' } });

  // Collections
  const chainsawManCollection = await prisma.collection.create({
    data: {
      name: 'Chainsaw Man',
      summary: 'Denji harbors a chainsaw devil within him. The world is introduced to Chainsaw Man, but...?!',
      genres: {
        connect: [ shonenGenre, actionGenre, darkFantasyGenre ]
      },
      userId
    }
  });

  const onePieceCollection = await prisma.collection.create({
    data: {
      name: 'One Piece',
      summary: 'As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer "Red-Haired" Shanks. But Luffy\'s life changed when he accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim again! Years later, still vowing to become the king of the pirates, Luffy sets out on his adventure...one guy alone in a rowboat, in search of the legendary "One Piece," said to be the greatest treasure in the world...',
      genres: {
        connect: [ shonenGenre, actionGenre, adventureGenre, fantasyGenre, comedyGenre]
      },
      userId,
    }
  });

  // Volumes
  await prisma.volume.create({
    data: {
      name: 'One Piece, Vol. 1: Romance Dawn',
      summary: 'As a child, Monkey D. Luffy dreamed of becoming King of the Pirates. But his life changed when he accidentally ate the Gum-Gum Fruit, an enchanted Devil Fruit that gave him the ability to stretch like rubber. Its only drawback? He’ll never be able to swim again—a serious handicap for an aspiring sea dog! Years later, Luffy sets off on his quest to find the “One Piece,” said to be the greatest treasure in the world…',
      pages: 212,
      collection: {
        connect: onePieceCollection
      },
      userId
    }
  });

  await prisma.volume.create({
    data: {
      name: 'One Piece, Vol. 2: Buggy the Clown',
      summary: 'As a kid, Monkey D. Luffy vowed to become King of the Pirates and find the legendary treasure called the "One Piece." The enchanted Gum-Gum Fruit has given Luffy the power to stretch like rubber--and his new crewmate, the infamous pirate hunter Roronoa Zolo, strikes fear into the hearts of other buccaneers! But what chance does one rubber guy stand against Nami, a thief so tough she specializes in robbing pirates...or Captain Buggy, a fiendish pirate lord whose weird, clownish appearance conceals even weirder powers? It\'s pirate vs. pirate in the second swashbuckling volume of One Piece!',
      pages: 200,
      collection: {
        connect: onePieceCollection
      },
      userId
    }
  });

  await prisma.volume.create({
    data: {
      name: 'Chaisaw Man 1',
      summary: 'Denji’s a poor young man who’ll do anything for money, even hunting down devils with his pet devil Pochita. He’s a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he’s betrayed by someone he trusts. Now with the power of a devil inside him, Denji’s become a whole new man—Chainsaw Man!',
      pages: 192,
      collection: {
        connect: chainsawManCollection
      },
      userId
    }
  });
}

main();