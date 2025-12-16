import {CollectionGetPayload} from "@/generated/prisma/models/Collection";

export type CollectionWithVolumes = CollectionGetPayload<{
  include: {
    volumes: true
  }
}>