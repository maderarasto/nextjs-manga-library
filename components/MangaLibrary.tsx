'use client';

import React, {useState} from 'react';
import LeftPanel from "@/components/sidebar/LeftPanel";
import Topbar from "@/components/Topbar";
import {Toaster} from "sonner";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Collection} from "@/generated/prisma/client";

export type MangaLibraryProps = {
  collections: Collection[];
}

const MangaLibrary = ({
  collections
}: MangaLibraryProps) => {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

  const handleSelectedCollection = (collection: Collection)=> {
    setActiveCollection(collection);
  }

  return (
    <SidebarProvider>
      <LeftPanel
        collections={collections}
        selectedCollection={activeCollection}
        onSelectedCollection={handleSelectedCollection}
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