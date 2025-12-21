import React from 'react';
import {Button} from "@/components/ui/button";
import {Edit2, Plus, Trash} from "lucide-react";
import {clsx} from "clsx";

export type VolumePreviewFooterProps = {
  className?: string;
  onAddClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const VolumePreviewFooter = ({
  className,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: VolumePreviewFooterProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onAddClick}
        >
          <Plus size={24} />
          Add to shopping list
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onEditClick}
        >
          <Edit2 size={24} />
          Edit
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={onDeleteClick}
        >
          <Trash size={24} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default VolumePreviewFooter;