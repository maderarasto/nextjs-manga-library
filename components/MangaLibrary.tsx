'use client';

import React, {useEffect, useState} from 'react';
import LeftPanel from "@/components/sidebar/LeftPanel";
import Topbar from "@/components/Topbar";
import {Toaster} from "sonner";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Volume} from "@/generated/prisma/client";
import {CollectionWithVolumes} from "@/lib/types";

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

  const handleSelectedCollection = (collection: CollectionWithVolumes)=> {
    setActiveCollection(collection);
  }

  const handleSelectedVolume = (volume: Volume)=> {
    setActiveVolume(volume);
  }

  return (
    <SidebarProvider>
      <LeftPanel
        collections={collections}
        selectedCollection={activeCollection}
        selectedVolume={activeVolume}
        onSelectedCollection={handleSelectedCollection}
        onSelectedVolume={handleSelectedVolume}
      />
      <main className="w-full">
        <Topbar activeCollection={activeCollection} />
        <div className="p-4">
          <h1>Hello</h1>
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default MangaLibrary;