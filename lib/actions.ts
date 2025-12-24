'use server';

import {VolumeWithCollection} from "@/lib/types";
import prisma from "@/lib/prisma";

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

