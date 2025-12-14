'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  useSidebar
} from '../ui/sidebar';
import Image from "next/image";
import {Plus, Search} from "lucide-react";
import CollectionMenuItem from "@/components/sidebar/CollectionMenuItem";
import {Button} from "@/components/ui/button";
import VolumeMenuItem from "@/components/sidebar/VolumeMenuItem";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";

const LeftPanel = () => {
  const {open: isOpen} = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        {isOpen ? <h1 className="font-bold text-xl text-slate-700 dark:text-white">Manga Library</h1> : ''}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Your collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-1 pb-2">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <SidebarMenu className="mb-2">
              <CollectionMenuItem label="One Piece">
                <VolumeMenuItem label="Volume 1" />
                <VolumeMenuItem label="Volume 2" />
                <VolumeMenuItem label="Volume 3" />
                <VolumeMenuItem label="Volume 4" />
                <VolumeMenuItem label="Volume 5" />
              </CollectionMenuItem>
              <CollectionMenuItem label="One Piece" />
            </SidebarMenu>
            <Button className="flex items-center w-full bg-red-400 dark:text-white dark:hover:text-black cursor-pointer">
              <Plus size={24} />
              <span>New Collection</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftPanel;