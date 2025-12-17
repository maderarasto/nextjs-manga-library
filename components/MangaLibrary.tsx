'use client';

import React, {useEffect, useMemo, useState} from 'react';
import LeftPanel from "@/components/sidebar/LeftPanel";
import Topbar from "@/components/Topbar";
import {Toaster} from "sonner";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Volume} from "@/generated/prisma/client";
import {CollectionWithVolumes} from "@/lib/types";
import VolumeCard from "@/components/VolumeCard";

export type MangaLibraryProps = {
  collections: CollectionWithVolumes[];
}

const MangaLibrary = ({
  collections
}: MangaLibraryProps) => {
  const [activeCollection, setActiveCollection] = useState<CollectionWithVolumes | null>(null);
  const [activeVolume, setActiveVolume] = useState<Volume | null>(null);

  useEffect(() => {
    const clearVolume = () => {
      setActiveVolume(null);
    }

    if (activeCollection?.id !== activeVolume?.collectionId) {
      clearVolume();
    }
  }, [activeCollection?.id, activeVolume?.collectionId]);

  const visibleVolumes = useMemo(() => {
    return collections.flatMap((collection) => {
      return collection.volumes;
    }).filter((volume) => !activeCollection || volume.collectionId === activeCollection.id);
  }, [collections, activeCollection]);

  const handleSelectedCollection = (collection: CollectionWithVolumes)=> {
    setActiveCollection(collection);
  }

  const handleSelectedVolume = (volume: Volume)=> {
    setActiveVolume(volume);
  }

  const handleCollectionChanged = (collection: CollectionWithVolumes|null) => {
    setActiveCollection(collection);
  }

  return (
    <SidebarProvider className="w-full">
      <LeftPanel
        collections={collections}
        selectedCollection={activeCollection}
        selectedVolume={activeVolume}
        onSelectedCollection={handleSelectedCollection}
        onSelectedVolume={handleSelectedVolume}
      />
      <main className="flex-1">
        <Topbar
          activeCollection={activeCollection}
          onCollectionChanged={handleCollectionChanged}
        />
        <div className="flex flex-wrap flex-1 gap-4 p-4">
          {visibleVolumes.map((volume) => (
            <VolumeCard key={volume.name} volume={volume} />
          ))}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default MangaLibrary;