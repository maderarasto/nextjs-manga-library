import React, {useCallback, useEffect, useState} from 'react';
import {Volume} from "@/generated/prisma/client";
import VolumeCard from "@/components/VolumeCard";
import {VolumeAction} from "@/components/VolumeContextMenu";

type LibraryProps = {
  volumes: Volume[]
  selectedVolumes: Volume[]
  activeVolume?: Volume
  onPickVolume?: (volume: Volume) => void
  onSelectedVolume?: (volume: Volume) => void
  onVolumeAction?: (volume: Volume, action: VolumeAction) => void
};

const Library = ({
  volumes,
  selectedVolumes = [],
  activeVolume,
  onPickVolume,
  onSelectedVolume,
  onVolumeAction,
}: LibraryProps) => {
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      setIsControlDown(event.key === 'Control');
    };

    const onKeyReleased = () => {
      setIsControlDown(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyReleased);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyReleased);
    }
  }, []);

  const pickVolume = (volume: Volume) => {
    if (!isControlDown) {
      onPickVolume?.(volume);
      return;
    }

    onSelectedVolume?.(volume);
  }

  return (
    <div className="flex flex-wrap flex-1 gap-4 p-4">
      {volumes.map((volume) => (
        <VolumeCard
          key={volume.name}
          volume={volume}
          onClick={() => pickVolume(volume)}
          onContextMenuAction={(action) => onVolumeAction?.(volume, action)}
          selected={!!selectedVolumes.find((vol) => {
            return vol.id === volume.id
          })}
          active={volume.id === activeVolume?.id}
        />
      ))}
    </div>
  );
};

export default Library;