import React from 'react';
import {Volume} from "@/generated/prisma/client";
import {Badge} from "@/components/ui/badge";

export type VolumeCardProps = {
  volume: Volume
}

const VolumeCard = ({
  volume,
}: VolumeCardProps) => {
  return (
    <div className="relative w-40 h-60 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col items-center h-full px-4 py-8 border rounded-xs bg-slate-200 dark:bg-slate-600">
        <span className="font-bold text-slate-600 dark:text-white">{volume.name}</span>
      </div>
      <Badge variant="secondary" className="absolute left-2 bottom-2 border border-gray-300">{volume.state}</Badge>
    </div>
  );
};

export default VolumeCard;