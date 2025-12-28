import React from 'react';
import {cn} from "@/lib/utils";

export type DefaultVolumeCoverProps = {
  title?: string
  className?: string
}

const DefaultVolumeCover = ({
  title,
  className,
}: DefaultVolumeCoverProps) => {
  return (
    <div className={cn('volume-card', className)}>
      <span className="font-bold text-center text-slate-600 dark:text-white">
        {title}
      </span>
    </div>
  );
};

export default DefaultVolumeCover;