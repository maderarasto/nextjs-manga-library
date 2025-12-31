'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarSeparator,
  useSidebar
} from '../ui/sidebar';
import Image from "next/image";
import {Plus, Search} from "lucide-react";
import CollectionMenuItem from "@/components/CollectionMenuItem";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import React from "react";
import {toast} from "sonner";
import {Volume} from "@/generated/prisma/client";
import {CollectionWithVolumes} from "@/lib/types";
import VolumeMenuItem from "@/components/VolumeMenuItem";

export type LeftPanelProps = {
  collections: CollectionWithVolumes[]
  activeCollection?: CollectionWithVolumes | null
  activeVolume?: Volume | null
  onActiveCollectionChange?: (collection: CollectionWithVolumes) => void
  onActiveVolumeChange?: (volume: Volume) => void
}

const LeftPanel = ({
  collections,
  activeCollection,
  activeVolume,
  onActiveCollectionChange,
  onActiveVolumeChange,
}: LeftPanelProps) => {
  const {open: isOpen} = useSidebar();

  const handleAddCollection = () => {
    toast.info("It should open dialog for new collection", {
      position: 'top-center'
    });
  }

  const selectCollection = (collection: CollectionWithVolumes) => {
    if (!onActiveCollectionChange) {
      return;
    }

    onActiveCollectionChange(collection);
  }

  const selectVolume = (volume: Volume) => {
    if (!onActiveVolumeChange) {
      return;
    }

    onActiveVolumeChange(volume);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        {isOpen ? <h1 className="font-bold text-xl text-slate-700 dark:text-white">Manga Library</h1> : ''}
      </SidebarHeader>
      <SidebarContent>
        {isOpen ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <InputGroup>
                <InputGroupInput placeholder="Search in collections..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : ''}
        <SidebarSeparator  />
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="uppercase">
            Your collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mb-2">
              <SidebarMenuButton className="flex flex-1 flex-row gap-3 cursor-pointer" onClick={handleAddCollection}>
                <div className="flex flex-1 items-center gap-3 text-gray-500">
                  <Plus size={20} />
                  <span>New Collection</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenu>
            <SidebarMenu>
              {collections.map((collection) => (
                <CollectionMenuItem
                  key={`${collection.name}-${collection.id}`}
                  label={collection.name}
                  onClick={() => selectCollection(collection)}
                  active={activeCollection?.id === collection.id}
                >
                  {collection.volumes.map((volume) => (
                    <VolumeMenuItem
                      key={volume.name}
                      label={volume.name}
                      active={activeVolume?.id === volume.id}
                      onClick={() => selectVolume(volume)}
                    />
                  ))}
                </CollectionMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        {isOpen ? (
          <SidebarGroup className="h-1/3">
            <SidebarGroupLabel className="uppercase">
              Shopping List
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex justify-center items-center py-2">
                <span className="text-xs text-gray-500">No added items yet.</span>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : ''}
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftPanel;