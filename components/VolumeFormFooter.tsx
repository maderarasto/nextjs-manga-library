import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft, Check} from "lucide-react";
import {clsx} from "clsx";

export type VolumeFormFooterProps = {
  className?: string
  showBack?: boolean
  onSaveClick?: () => void
  onBackClick?: () => void
}

const VolumeFormFooter = ({
  className,
  showBack = true,
  onSaveClick,
  onBackClick,
}: VolumeFormFooterProps) => {
  return (
    <div className={clsx('flex flex-col justify-end gap-2', className)}>
      {showBack ? (
        <Button
          variant="outline"
          onClick={() => onBackClick?.()}
        >
          <ArrowLeft size={24} />
          Back to preview
        </Button>
      ) : ''}
      <Button
        variant="default"
        onClick={() => onSaveClick?.()}
      >
        <Check size={24} />
        Save
      </Button>
    </div>
  );
};

export default VolumeFormFooter;