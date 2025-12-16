import {currentUser} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import MangaLibrary from "@/components/MangaLibrary";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const collections = await prisma.collection.findMany({
    where: {
      userId: user.id
    },
    include: {
      volumes: true
    }
  });

  return (
    <MangaLibrary collections={collections} />
  );
}
