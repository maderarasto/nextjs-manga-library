import React from 'react';
import {Volume} from "@/generated/prisma/client";
import {Badge} from "@/components/ui/badge";
import {clsx} from "clsx";
import {CircleCheck} from "lucide-react";
import DefaultVolumeCover from "@/components/DefaultVolumeCover";
import {cn} from "@/lib/utils";

export type VolumeCardProps = {
  volume: Volume,
  onClick?: () => void,
  selected?: boolean,
  active?: boolean
}

const VolumeCard = ({
  volume,
  onClick,
  selected = false,
  active = false,
}: VolumeCardProps) => {
  return (
    <div className="volume-card-wrapper" onClick={onClick}>
      <DefaultVolumeCover title={volume.name} className={cn(
        active ? 'ring-4 ring-emerald-500 dark:ring-emerald-700' : '',
        selected ? 'ring-4 ring-slate-600 dark:ring-white' : '',
      )} />
      <Badge variant="secondary" className="absolute left-2 bottom-2 border border-gray-300">{volume.state}</Badge>
      {selected ? (
        <CircleCheck size={20} strokeWidth={3} className="absolute -left-2 -top-2 fill-slate-200 dark:fill-slate-600 stroke-slate-600 dark:stroke-white" />
      ): ''}
    </div>
  );
};

export default VolumeCard;