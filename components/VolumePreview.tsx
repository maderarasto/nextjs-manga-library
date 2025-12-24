import React, {use} from 'react';
import {clsx} from "clsx";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {VolumeWithCollection} from "@/lib/types";

export type VolumePreviewProps = {
  volume: VolumeWithCollection
  className?: string
}

const VolumePreview = ({
  volume,
  className,
}: VolumePreviewProps) => {
  console.log(volume);

  return (
    <div className={clsx('p-4 overflow-y-auto', className)}>
      <div className="flex justify-center mb-12">
        <div className="volume-card w-64 h-96"></div>
      </div>
      <div className="mb-4">
        <h4 className="mb-0 uppercase">{volume.collection.name}</h4>
        <h2 className="font-bold text-3xl">{volume.name}</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {volume.collection.genres.map((genre) => (
          <Badge key={genre.name} className="px-2 rounded-sm">{genre.name}</Badge>
        ))}
      </div>
      <div className="flex flex-col mb-8">
        <h4 className="font-bold text-lg uppercase text-muted-foreground">Summary</h4>
        <p>{volume.summary}</p>
      </div>
      <div className="content-center my-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Status</span>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger onClick={() => {}}>
                  <Badge className="px-2 rounded-sm text-sm capitalize">
                    {volume.state.toLowerCase()}
                    <ChevronDown size={24} className="mt-0.5" />
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Bought</DropdownMenuItem>
                  <DropdownMenuItem>Reading</DropdownMenuItem>
                  <DropdownMenuItem>Finished</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Pages</span>
            <span className="font-bold text-lg">{volume.pages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumePreview;