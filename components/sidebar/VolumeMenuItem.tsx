import React from 'react';
import {SidebarMenuSubButton} from "@/components/ui/sidebar";
import {Book, } from "lucide-react";

export type VolumeMenuItemProps = {
  label: string
}

const VolumeMenuItem = ({
  label,
}: VolumeMenuItemProps) => {
  return (
    <SidebarMenuSubButton>
      <div className="flex flex-1 flex-row gap-3 cursor-pointer">
        <div className="flex flex-1 items-center gap-3">
          <Book size={20} />
          {label}
        </div>
      </div>
    </SidebarMenuSubButton>
  );
};

export default VolumeMenuItem;