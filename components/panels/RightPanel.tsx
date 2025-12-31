import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {clsx} from "clsx";
import VolumePreview from "@/components/VolumePreview";
import VolumeForm, {VolumeFormMethods} from "@/components/VolumeForm";
import VolumePreviewFooter from "@/components/VolumePreviewFooter";
import VolumeFormFooter from "@/components/VolumeFormFooter";
import VolumePreviewSkeleton from "@/components/panels/VolumePreviewSkeleton";
import {VolumeWithCollection} from "@/lib/types";
import {getVolume} from "@/lib/actions";
import ConfirmDialog, {ConfirmDialogMethods} from "@/components/ConfirmDialog";
import {toast} from "sonner";

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
  onShouldUpdateData?: () => void,
}

const RightPanel = forwardRef<RightPanelMethods, RightPanelProps>(({
  onOpenChange,
  onShouldUpdateData,
}: RightPanelProps, ref) => {
  const [volumeId, setVolumeId] = useState<number | null>(null);
  const [volume, setVolume] = useState<VolumeWithCollection | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<RightPanelMode>("Preview");

  const formRef = useRef<VolumeFormMethods>(null);
  const dialogRef = useRef<ConfirmDialogMethods>(null);

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

  const handleFormSuccess = () => {
    onShouldUpdateData?.();

    if (volumeId) {
      setVolume(null);
      setMode("Preview");
      getVolume(volumeId).then((volume) => {
        setVolume(volume);
      });

      toast.success(`A volume successfully updated`, {
        position: "top-center",
      });
    } else {
      changeOpen(false);
      toast.success(`A new volume successfully created`, {
        position: "top-center",
      });
    }
  }

  const handleBack = () => {
    if (!(formRef.current?.isDirty() ?? false)) {
      setMode("Preview");
      return;
    }

    dialogRef.current?.open();
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
              <VolumeForm
                ref={formRef}
                className={clsx(
                  'w-full shrink-0 transition-transform duration-500',
                )}
                onSuccess={handleFormSuccess}
              />
            ) : volume ? (
              <>
                <VolumePreview
                  volume={volume}
                  className={clsx(
                    'w-full shrink-0 transition-transform duration-500',
                    mode !== 'Preview' ? '-translate-x-full' : '',
                  )}
                />
                <VolumeForm
                  ref={formRef}
                  volume={volume}
                  className={clsx(
                    'w-full shrink-0 transition-transform duration-500',
                    volumeId && mode === 'Edit' ? '-translate-x-full' : '',
                  )}
                  onSuccess={handleFormSuccess}
                />
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
              showBack={!!volumeId}
              onSaveClick={() => formRef.current?.submit()}
              onBackClick={handleBack}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ConfirmDialog
        ref={dialogRef}
        title="Are you sure you want to go back?"
        description="You have unsaved changes and going back without saving will discard them."
        onConfirm={() => {
          console.log('a');
          formRef.current?.reset();
          setMode("Preview");
        }}
      />
    </div>
  );
});

RightPanel.displayName = "RightPanel";
export default RightPanel;