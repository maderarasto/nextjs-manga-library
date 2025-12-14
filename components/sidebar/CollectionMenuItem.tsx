import React from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronRight, SquareLibrary} from "lucide-react";
import {SidebarMenuButton, SidebarMenuSub} from "@/components/ui/sidebar";
import {clsx} from "clsx";

export type CollectionMenuItemProps = {
  label: string
  children?: React.ReactNode
  open?: boolean
}

const CollectionMenuItem = ({
  label,
  children,
  open = false,
}: CollectionMenuItemProps) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const toggleCollapsible = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} onDoubleClick={() => toggleCollapsible()}>
      <SidebarMenuButton>
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
                isOpen ? 'rotate-90' : 'rotate-0')}
            />
          </CollapsibleTrigger>
        </div>
      </SidebarMenuButton>
      <CollapsibleContent>
        {children ? (
          <SidebarMenuSub>
            {children}
          </SidebarMenuSub>
        ) : (
          <div className="flex justify-center items-center">
            <span className="text-gray-500">No volumes yet</span>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollectionMenuItem;