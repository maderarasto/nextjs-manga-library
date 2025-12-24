import React from 'react';
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

export type VolumePreviewSkeletonProps = {
  className?: string;
}

const VolumePreviewSkeleton = ({
  className,
}: VolumePreviewSkeletonProps) => {
  return (
    <div className={cn('p-4 overflow-y-auto', className)}>
      <Skeleton className="w-64 h-96 mx-auto mb-12" />
      <div className="mb-4 space-y-2">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-52 h-12" />
      </div>
      <div className="flex flex-wrap gap-1 mb-8">
        <Skeleton className="w-20 h-6"></Skeleton>
        <Skeleton className="w-20 h-6"></Skeleton>
        <Skeleton className="w-20 h-6"></Skeleton>
      </div>
      <div className="mb-8 space-y-2">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-full h-48" />
      </div>
      <div className="content-center mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Status</span>
            <Skeleton className="w-20 h-6"></Skeleton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Pages</span>
            <Skeleton className="w-20 h-6"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumePreviewSkeleton;