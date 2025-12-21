import React from 'react';
import {VolumeFormProps} from "@/components/VolumeForm";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Check} from "lucide-react";
import {clsx} from "clsx";

export type VolumeFormFooterProps = {
  className?: string;
  onBack?: (success?: boolean) => void;
}

const VolumeFormFooter = ({
  className,
  onBack,
}: VolumeFormFooterProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => onBack?.call(null)}
      >
        <ArrowLeft size={24} />
        Back to preview
      </Button>
      <Button variant="default" className="flex-1">
        <Check size={24} />
        Save
      </Button>
    </div>
  );
};

export default VolumeFormFooter;