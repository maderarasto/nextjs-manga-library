import React, {ReactNode} from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem, ContextMenuLabel,
  ContextMenuTrigger
} from "@/components/ui/context-menu";

export type VolumeAction = (
  | 'Select'
  | 'Preview'
  | 'Edit'
  | 'Delete'
);

type VolumeContextMenuProps = {
  children?: ReactNode;
  onAction?: (action: VolumeAction) => void;
}

const VolumeContextMenu = ({
  children,
  onAction,
}: VolumeContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="volume-context-menu">
        <ContextMenuGroup>
          <ContextMenuItem
            onSelect={() => onAction?.('Select')}
          >
            Select
          </ContextMenuItem>
          <ContextMenuItem
            onSelect={() => onAction?.('Preview')}
          >
            Preview
          </ContextMenuItem>
          <ContextMenuItem
            onSelect={() => onAction?.('Edit')}
          >
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            variant="destructive"
            onSelect={() => onAction?.('Delete')}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default VolumeContextMenu;