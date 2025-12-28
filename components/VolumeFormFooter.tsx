import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft, Check} from "lucide-react";
import {clsx} from "clsx";

export type VolumeFormFooterProps = {
  className?: string;
  onSaveClick?: () => void;
  onBackClick?: () => void;
}

const VolumeFormFooter = ({
  className,
  onSaveClick,
  onBackClick,
}: VolumeFormFooterProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => onBackClick?.()}
      >
        <ArrowLeft size={24} />
        Back to preview
      </Button>
      <Button
        variant="default"
        className="flex-1"
        onClick={() => onSaveClick?.()}
      >
        <Check size={24} />
        Save
      </Button>
    </div>
  );
};

export default VolumeFormFooter;