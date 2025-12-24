'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import LeftPanel from "@/components/panels/LeftPanel";
import Topbar from "@/components/Topbar";
import {Toaster} from "sonner";
import {SidebarProvider} from "@/components/ui/sidebar";
import {Volume} from "@/generated/prisma/client";
import {CollectionWithVolumes} from "@/lib/types";
import VolumeCard from "@/components/VolumeCard";
import RightPanel, {RightPanelMethods} from "@/components/panels/RightPanel";

export type MangaLibraryProps = {
  collections: CollectionWithVolumes[];
}

const MangaLibrary = ({
  collections
}: MangaLibraryProps) => {
  const [activeCollection, setActiveCollection] = useState<CollectionWithVolumes | null>(null);
  const [activeVolume, setActiveVolume] = useState<Volume | null>(null);
  const [selectedVolumes, setSelectedVolumes] = useState<number[]>([]);
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  const rightPanelRef = useRef<RightPanelMethods>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      setIsControlDown(event.key === 'Control');
    };

    const onKeyReleased = () => {
      setIsControlDown(false);
    }

    const onDocumentClick = (ev: MouseEvent) => {
      const nearestVolumeWrapper = (ev.target as HTMLElement).closest('.volume-card-wrapper');
      const nearestSheetOverlay = (ev.target as HTMLElement).closest('[data-slot="sheet-overlay"]');

      if (nearestVolumeWrapper || nearestSheetOverlay) {
        return;
      }

      setSelectedVolumes([]);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyReleased);
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyReleased);
      document.removeEventListener("click", onDocumentClick);
    }
  }, []);

  useEffect(() => {
    if (!rightPanelRef?.current) {
      return;
    }

    if (activeVolume) {
      rightPanelRef.current.open('Preview', activeVolume.id);
    }
  }, [activeVolume])

  useEffect(() => {
    const clearVolume = () => {
      setActiveVolume(null);
    }

    if (!activeCollection || !activeVolume) {
      return;
    }

    if (activeCollection.id !== activeVolume.collectionId) {
      clearVolume();
    }
  }, [activeCollection, activeVolume]);

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
    setSelectedVolumes([]);
    setActiveCollection(collection);
  }

  const handleVolumePick = (volume: Volume) => {
    if (!isControlDown) {
      setActiveVolume(volume);
      return;
    }

    setSelectedVolumes((prevVolumes) => {
      const foundVolumeId = prevVolumes.find((volumeId) => {
        return volumeId === volume.id;
      });

      if (!foundVolumeId) {
        return [...prevVolumes, volume.id];
      }

      return prevVolumes.filter((volumeId) => {
        return volumeId !== volume.id;
      });
    });
  }

  const handleRightPanelOpenChange = (open: boolean) => {
    if (!open) {
      setActiveVolume(null);
    }
  }

  return (
    <SidebarProvider className="">
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
            <VolumeCard
              key={volume.name}
              volume={volume}
              onPick={handleVolumePick}
              selected={selectedVolumes.includes(volume.id)}
              active={volume.id === activeVolume?.id}
            />
          ))}
        </div>
      </main>
      <RightPanel
        ref={rightPanelRef}
        onOpenChange={handleRightPanelOpenChange}
      />
      <Toaster />
    </SidebarProvider>
  );
};

export default MangaLibrary;