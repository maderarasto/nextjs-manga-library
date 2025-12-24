import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {clsx} from "clsx";
import VolumePreview from "@/components/VolumePreview";
import VolumeForm from "@/components/VolumeForm";
import VolumePreviewFooter from "@/components/VolumePreviewFooter";
import VolumeFormFooter from "@/components/VolumeFormFooter";
import VolumePreviewSkeleton from "@/components/panels/VolumePreviewSkeleton";
import {VolumeWithCollection} from "@/lib/types";
import {getVolume} from "@/lib/actions";

type RightPanelMode = (
  | 'Preview'
  | 'Edit'
)

export interface RightPanelMethods {
  open: (mode: RightPanelMode, volumeId?: number) => void;
  close: () => void;
}

export type RightPanelProps = {
  onOpenChange?: (open: boolean) => void,
}

const RightPanel = forwardRef<RightPanelMethods, RightPanelProps>(({
  onOpenChange,
}: RightPanelProps, ref) => {
  const [volumeId, setVolumeId] = useState<number | null>(null);
  const [volume, setVolume] = useState<VolumeWithCollection | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<RightPanelMode>("Preview");

  useEffect(() => {
    const clearVolume = () => {
      setVolume(null);
    }

    if (!volumeId) {
      clearVolume();
      return;
    }

    getVolume(volumeId).then((volume) => {
      setVolume(volume);
    });

  }, [volumeId]);

  const changeOpen = (open: boolean) => {
    let wasOpen;

    setIsOpen((prevIsOpen) => {
      wasOpen = prevIsOpen;
      return open;
    });

    if (wasOpen != open && onOpenChange) {
      onOpenChange(open);
    }

    if (!open) {
      setMode("Preview");
      setVolumeId(null);
      setVolume(null);
    }
  }

  useImperativeHandle(ref, () => ({
    open: (mode: RightPanelMode, volumeId?: number) => {
      setMode(mode);
      setVolumeId(volumeId ?? null);
      changeOpen(true);
    },

    close: () => {
      changeOpen(false)
    }
  }));

  return (
    <div className="right-panel">
      <Sheet open={isOpen} onOpenChange={changeOpen}>
        <SheetContent onOpenAutoFocus={(ev) => ev.preventDefault()}>
          <SheetHeader>
            <SheetTitle>
              Manga Volume
              {mode === 'Preview' ? ' Preview' : ''}
              {mode === 'Edit' ? ' Form' : ''}
            </SheetTitle>
          </SheetHeader>
          <div className="flex overflow-x-hidden">
            {!volumeId ? (
              <VolumeForm className={clsx(
                'w-full shrink-0 transition-transform duration-500',
              )} />
            ) : volume ? (
              <>
                <VolumePreview
                  volume={volume}
                  className={clsx(
                    'w-full shrink-0 transition-transform duration-500',
                    mode !== 'Preview' ? '-translate-x-full' : '',
                  )} />
                <VolumeForm className={clsx(
                  'w-full shrink-0 transition-transform duration-500',
                  volumeId && mode === 'Edit' ? '-translate-x-full' : '',
                )} />
              </>
            ) : (
              <VolumePreviewSkeleton />
            )}
          </div>
          <SheetFooter className="flex flex-row overflow-x-hidden">
            <VolumePreviewFooter
              className={clsx(
                'w-full shrink-0 transition-transform duration-500',
                mode !== 'Preview' ? 'invisible -translate-x-full' : '',
              )}
              onEditClick={() => setMode("Edit")}
            />
            <VolumeFormFooter
              className={clsx(
                'w-full shrink-0 transition-transform duration-500',
                mode === 'Edit' ? '-translate-x-full' : '',
                mode !== 'Edit' ? 'invisible' : '',
              )}
              onBack={() => setMode("Preview")}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
});

RightPanel.displayName = "RightPanel";
export default RightPanel;