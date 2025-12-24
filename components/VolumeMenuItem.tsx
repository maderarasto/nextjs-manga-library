import React from 'react';
import {SidebarMenuSubButton} from "@/components/ui/sidebar";
import {Book, } from "lucide-react";

export type VolumeMenuItemProps = {
  label: string
  onClick?: () => void
  active?: boolean
}

const VolumeMenuItem = ({
  label,
  onClick,
  active = false,
}: VolumeMenuItemProps) => {
  return (
    <SidebarMenuSubButton onClick={onClick} isActive={active}>
      <div className="flex flex-1 flex-row gap-3 cursor-pointer">
        <div className="flex flex-1 items-center gap-3 overflow-x-hidden truncate">
          <Book size={20} />
          {label}
        </div>
      </div>
    </SidebarMenuSubButton>
  );
};

export default VolumeMenuItem;