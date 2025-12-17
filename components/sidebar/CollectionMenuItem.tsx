import React, {useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronRight, SquareLibrary} from "lucide-react";
import {SidebarMenuButton, SidebarMenuSub, useSidebar} from "@/components/ui/sidebar";
import {clsx} from "clsx";

export type CollectionMenuItemProps = {
  label: string
  children?: React.ReactNode
  onClick?: () => void
  active?: boolean
  collapsed?: boolean
}

const CollectionMenuItem = ({
  label,
  children,
  onClick,
  active = false,
  collapsed = true,
}: CollectionMenuItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const {open} = useSidebar();

  const toggleCollapsible = () => {
    setIsCollapsed((oldIsCollapsed) => !oldIsCollapsed);
  }

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
      onClick={onClick}
      onDoubleClick={() => toggleCollapsible()}
    >
      <SidebarMenuButton isActive={active}>
        <div className="flex flex-1 flex-row gap-3 cursor-pointer">
          <div className="flex flex-1 items-center gap-3">
            <SquareLibrary size={20} />
            {label}
          </div>
          <CollapsibleTrigger asChild>
            <ChevronRight
              size={20}
              className={clsx(
                'transition-transform duration-500',
                isCollapsed ? 'rotate-0' : 'rotate-90')}
            />
          </CollapsibleTrigger>
        </div>
      </SidebarMenuButton>
      <CollapsibleContent>
        {Array.isArray(children) && children.length > 0 ? (
          <SidebarMenuSub className="mr-0 pr-0">
            {children}
          </SidebarMenuSub>
        ) : open ? (
          <div className="flex justify-center items-center py-1">
            <span className="text-gray-500">No volumes yet</span>
          </div>
        ) : ''}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollectionMenuItem;