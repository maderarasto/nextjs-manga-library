import {CollectionGetPayload} from "@/generated/prisma/models/Collection";
import {VolumeGetPayload} from "@/generated/prisma/models/Volume";

export type CollectionWithVolumes = CollectionGetPayload<{
  include: {
    volumes: true
  }
}>

export type VolumeWithCollection = VolumeGetPayload<{
  include: {
    collection: {
      include: {
        genres: true
      }
    }
  }
}>