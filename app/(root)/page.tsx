'use client'

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {CollectionWithVolumes} from "@/lib/types";
import {Volume} from "@/generated/prisma/client";
import RightPanel, {RightPanelMethods} from "@/components/panels/RightPanel";
import {SidebarProvider} from "@/components/ui/sidebar";
import LeftPanel from "@/components/panels/LeftPanel";
import Topbar from "@/components/Topbar";
import {toast, Toaster} from "sonner";
import {deleteVolume, getCollectionsWithVolumes} from "@/lib/actions";
import Library from "@/components/Library";
import ConfirmDialog, {ConfirmDialogMethods} from "@/components/ConfirmDialog";

export default function Home() {
  const [collections, setCollections] = useState<CollectionWithVolumes[]>([]);
  const [activeVolume, setActiveVolume] = useState<Volume|null>(null);
  const [volumeForDeletion, setVolumeForDeletion] = useState<Volume|null>(null);
  const [activeCollection, setActiveCollection] = useState<CollectionWithVolumes|null>(null);
  const [selectedVolumeIds, setSelectedVolumeIds] = useState<number[]>([]);

  const rightPanelRef = useRef<RightPanelMethods>(null);
  const deleteDialogRef = useRef<ConfirmDialogMethods>(null);

  const loadCollections = useCallback(async () => {
    getCollectionsWithVolumes().then((collections) => {
      setCollections(collections);
    })
  }, []);

  useEffect(() => {
    const onDocumentClick = (ev: MouseEvent) => {
      const nearestVolumeWrapper = (ev.target as HTMLElement).closest('.volume-card-wrapper');
      const nearestSheetOverlay = (ev.target as HTMLElement).closest('[data-slot="sheet-overlay"]');

      if (nearestVolumeWrapper || nearestSheetOverlay) {
        return;
      }

      setSelectedVolumeIds([]);
    }

    loadCollections();
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    }
  }, [loadCollections]);

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

  const selectedVolumes = useMemo(() => {
    return visibleVolumes.filter((volume) => {
      return selectedVolumeIds.includes(volume.id);
    });
  }, [selectedVolumeIds, visibleVolumes]);

  const handleActiveCollectionChange = (collection: CollectionWithVolumes)=> {
    setActiveCollection(collection);
  }

  const handleActiveVolumeChange = (volume: Volume)=> {
    setActiveVolume(volume);
  }

  const handleCollectionChanged = (collection: CollectionWithVolumes|null) => {
    setSelectedVolumeIds([]);
    setActiveCollection(collection);
  }

  const handleRightPanelOpenChange = (open: boolean) => {
    if (!open) {
      setActiveVolume(null);
    }
  }

  const handlePickVolume = (volume: Volume) => {
    setActiveVolume(volume);
  }

  const handleSelectedVolume = (volume: Volume) => {
    setSelectedVolumeIds((prevVolumeIds) => {
      const foundVolume = prevVolumeIds.find((volumeId) => {
        return volumeId === volume.id;
      });

      if (!foundVolume) {
        return [...prevVolumeIds, volume.id];
      }

      return prevVolumeIds.filter((volumeId) => {
        return volumeId !== volume.id;
      });
    });
  }

  const handleShouldUpdateData = () => {
    setCollections([]);
    loadCollections();
  }

  const handleConfirmDeleteVolume = async () => {
    if (!volumeForDeletion) {
      return;
    }

    const volumeName = volumeForDeletion.name;
    await deleteVolume(volumeForDeletion.id);

    setVolumeForDeletion(null);
    setCollections([]);
    loadCollections();

    if (rightPanelRef.current?.isOpen()) {
      rightPanelRef.current.close();
    }

    toast.success(`A volume with name "${volumeName}" successfully deleted.`);
  }

  const handleCreateVolumeClick = () => {
    rightPanelRef.current?.open('Edit');
  }

  return (
    <SidebarProvider className="">
      <LeftPanel
        collections={collections}
        activeCollection={activeCollection}
        activeVolume={activeVolume}
        onActiveCollectionChange={handleActiveCollectionChange}
        onActiveVolumeChange={handleActiveVolumeChange}
      />
      <main className="flex-1">
        <Topbar
          activeCollection={activeCollection}
          onCreateVolumeClick={handleCreateVolumeClick}
          onCollectionChanged={handleCollectionChanged}
        />
        <Library
          volumes={visibleVolumes}
          selectedVolumes={selectedVolumes}
          activeVolume={activeVolume ?? undefined}
          onPickVolume={handlePickVolume}
          onSelectedVolume={handleSelectedVolume}
        />
      </main>
      <RightPanel
        ref={rightPanelRef}
        onOpenChange={handleRightPanelOpenChange}
        onShouldUpdateData={handleShouldUpdateData}
        onDeleteVolume={(volume) => {
          setVolumeForDeletion(volume);
          deleteDialogRef.current?.open();
        }}
      />
      {volumeForDeletion ? (
        <ConfirmDialog
          ref={deleteDialogRef}
          title="Are you sure you want to delete this volume?"
          description={`A volume with name "${volumeForDeletion.name}" will be permanently deleted.`}
          onConfirm={handleConfirmDeleteVolume}
        />
      ) : ''}
      <Toaster />
    </SidebarProvider>
  );
}
