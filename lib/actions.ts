'use server';

import {CollectionWithVolumes, VolumeWithCollection} from "@/lib/types";
import prisma from "@/lib/prisma";
import {Collection} from "@/generated/prisma/client";
import {currentUser} from "@clerk/nextjs/server";
import {VolumeSchemaType} from "@/lib/schemas";

export async function getCollections(search: string = ''): Promise<Collection[]>
{
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.collection.findMany({
    where: {
      userId: user.id,
      name: {
        contains: search,
        mode: 'insensitive'
      }
    }
  })
}

export async function getCollectionsWithVolumes(search: string = ''): Promise<CollectionWithVolumes[]> {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.collection.findMany({
    where: {
      userId: user.id,
      name: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: {
      volumes: true
    }
  })
}

export async function getVolume(volumeId: number): Promise<VolumeWithCollection|null> {
  return prisma.volume.findFirst({
    where: {
      id: volumeId
    },
    include: {
      collection: {
        include: {
          genres: true
        }
      }
    }
  })
}

export async function updateVolume(volumeId: number, data: VolumeSchemaType) {
  console.log(data);
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.volume.update({
    where: {
      id: volumeId,
    },
    data: {
      ...data,
      userId: user.id,
    }
  });
}

