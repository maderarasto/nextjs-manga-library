import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {clsx} from "clsx";
import VolumePreview from "@/components/VolumePreview";
import VolumeForm from "@/components/VolumeForm";
import VolumePreviewFooter from "@/components/VolumePreviewFooter";
import VolumeFormFooter from "@/components/VolumeFormFooter";

type RightPanelMode = (
  | 'Preview'
  | 'Edit'
)

export interface RightPanelMethods {
  open: () => void;
  close: () => void;
}

export type RightPanelProps = {
  onOpenChange?: (open: boolean) => void,
}

const RightPanel = forwardRef<RightPanelMethods, RightPanelProps>(({
  onOpenChange,
}: RightPanelProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<RightPanelMode>("Preview");

  const changeOpen = (open: boolean) => {
    let wasOpen;

    setIsOpen((prevIsOpen) => {
      wasOpen = prevIsOpen;
      return open;
    });

    if (wasOpen != open && onOpenChange) {
      setMode("Preview");
      onOpenChange(open);
    }
  }

  useImperativeHandle(ref, () => ({
    open: () => {
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
            <VolumePreview
              className={clsx(
                'w-full shrink-0 transition-transform duration-500',
                mode !== 'Preview' ? '-translate-x-full' : '',
              )} />
            <VolumeForm className={clsx(
              'w-full shrink-0 transition-transform duration-500',
              mode === 'Edit' ? '-translate-x-full' : '',
            )} />
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