import React from 'react';
import {clsx} from "clsx";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export type VolumePreviewProps = {
  className?: string;
}

const VolumePreview = ({
  className,
}: VolumePreviewProps) => {
  return (
    <>
      <div className={clsx('p-4 overflow-y-auto', className)}>
        <div className="flex justify-center mb-12">
          <div className="volume-card w-64 h-96"></div>
        </div>
        <div className="mb-4">
          <h4 className="mb-0 uppercase">One Piece</h4>
          <h2 className="font-bold text-3xl leading-6">One piece 4</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge className="px-2 rounded-sm">Secondary</Badge>
          <Badge className="px-2 rounded-sm">Secondary</Badge>
          <Badge className="px-2 rounded-sm">Secondary</Badge>
        </div>
        <div className="flex flex-col mb-8">
          <h4 className="font-bold text-lg uppercase text-muted-foreground">Summary</h4>
          <p>Ghosts, monsters, aliens, teen romance, battles...and the kitchen sink! This series has it all! Takakura, an occult maniac who doesn't believe in ghosts, and Ayase, a girl who doesn't believe in aliens, try to overcome their differences when they encounter the paranormal! This manga is out of this world!</p>
        </div>
        <div className="content-center my-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Status</span>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Badge className="px-2 rounded-sm text-sm">Released</Badge>
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
              <span className="font-bold text-lg">200</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolumePreview;