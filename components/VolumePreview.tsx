  import React, {useMemo} from 'react';
import {clsx} from "clsx";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Edit2} from "lucide-react";
import {VolumeWithCollection} from "@/lib/types";
import DefaultVolumeCover from "@/components/DefaultVolumeCover";
import {VolumeState} from "@/generated/prisma/enums";
import {Button} from "@/components/ui/button";
import {updateVolume} from "@/lib/actions";
import {Empty, EmptyDescription} from "@/components/ui/empty";

export type VolumePreviewProps = {
  volume: VolumeWithCollection
  className?: string
  onUpdate?: () => void
}

const VolumePreview = ({
  volume,
  className,
  onUpdate,
}: VolumePreviewProps) => {
  const otherStates = useMemo(() => {
    return Object.values(VolumeState).filter((state) => {
      return state !== volume.state;
    });
  }, [volume]);

  const changeVolumeState = async (state: VolumeState) => {
    if (state === volume.state) {
      return;
    }

    const {error} = await updateVolume(volume.id, {
      collectionId: volume.collectionId,
      name: volume.name,
      summary: volume.summary ?? undefined,
      state: state,
    });

    if (error) {
      console.error(error);
      return;
    }

    onUpdate?.();
  }

  return (
    <div className={clsx('p-4 overflow-y-auto', className)}>
      <div className="flex justify-center mb-12">
        <DefaultVolumeCover title={volume.name} className="w-32 md:w-48 h-48 md:h-72 text-sm md:text-base" />
      </div>
      <div className="mb-4">
        <h4 className="mb-0 uppercase text-sm md:text-base">{volume.collection.name}</h4>
        <h2 className="font-bold text-xl md:text-2xl">{volume.name}</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {volume.collection.genres.map((genre) => (
          <Badge key={genre.name} className="px-2 rounded-sm">{genre.name}</Badge>
        ))}
      </div>
      <div className="flex flex-col mb-8">
        <h4 className="font-bold text-base md:text-lg uppercase text-muted-foreground">Summary</h4>
        {volume.summary ? (
          <p className="text-sm md:text-base">{volume.summary}</p>
        ) : (
          <Empty>
            <EmptyDescription>
              No summary available.
            </EmptyDescription>
          </Empty>
        )}
      </div>
      <div className="content-center my-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Status</span>
            <div className="relative flex items-center gap-1">
              <Badge className="px-2 rounded-sm text-xs md:text-sm capitalize">
                {volume.state?.toLowerCase()}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="absolute -right-8">
                  <Button variant="link" className="size-7 cursor-pointer hover:bg-secondary">
                    <Edit2 className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {otherStates.map((state) => (
                    <DropdownMenuItem key={state} onClick={() => changeVolumeState(state)}>
                      <span className="capitalize">
                        {state.toLowerCase()}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400">Pages</span>
            <span className="font-bold text-base md:text-lg">{volume.pages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumePreview;