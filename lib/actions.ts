'use server';

import {CollectionWithVolumes, VolumeWithCollection} from "@/lib/types";
import prisma from "@/lib/prisma";
import {Collection} from "@/generated/prisma/client";
import {currentUser} from "@clerk/nextjs/server";
import {VolumeSchemaType} from "@/lib/schemas";

export type ActionError = {
  message: string
  type?: string
};

export type DataResult<D> = {
  data: D
  error?: never
};

export type ErrorResult = {
  data?: never
  error: ActionError
};

export type ServerResult<D> = DataResult<D> | ErrorResult;

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

export async function createVolume(data: VolumeSchemaType): Promise<ServerResult<void>>
{
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const foundVolume = await prisma.volume.findFirst({
    where: {
      name: data.name,
    }
  });

  if (foundVolume) {
    return {
      error: {
        type: 'name',
        message: `A volume with name "${data.name}" already exists.`,
      }
    }
  }

  await prisma.volume.create({
    data: {
      ...data,
      userId: user.id,
    }
  });

  return {
    data: undefined,
  };
}

export async function updateVolume(volumeId: number, data: VolumeSchemaType): Promise<ServerResult<void>> {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.volume.update({
    where: {
      id: volumeId,
    },
    data: {
      ...data,
      userId: user.id,
    }
  });

  return {
    data: undefined,
  }
}

export async function deleteVolume(volumeId: number): Promise<ServerResult<void>> {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.volume.delete({
    where: {
      id: volumeId,
    }
  });

  return {
    data: undefined,
  };
}

