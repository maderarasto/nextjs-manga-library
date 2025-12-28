import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export interface ConfirmDialogMethods {
  open(): void;
  close(): void;
}

type ConfirmDialogProps = {
  title: string;
  description: string;
  open?: boolean,
  confirmButtonText?: string;
  cancelButtonText?: string;
  onOpenChange?: (open: boolean) => void,
  onConfirm?: () => void;
  onCancel?: () => void;
  // onClose?: () => void,
}

const ConfirmDialog = forwardRef<ConfirmDialogMethods, ConfirmDialogProps>(({
  title,
  description,
  open = false,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  onOpenChange,
  onConfirm,
  onCancel,
}, ref) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    const changeOpen = (open: boolean) => {
      setIsOpen(open);
    }

    changeOpen(open);
  }, [open]);

  useEffect(() => {

  }, [isOpen]);

  const changeOpen = (open: boolean) => {
    let prevOpen;

    setIsOpen((prevIsOpen) => {
      prevOpen = prevIsOpen;
      return open;
    });

    if (prevOpen != open && onOpenChange) {
      onOpenChange(open);
    }
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      changeOpen(true);
    },

    close: () => {
      changeOpen(false);
    }
  }))

  return (
    <AlertDialog open={isOpen} onOpenChange={changeOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/*Are you sure you want to go back?*/}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {/*You have unsaved changes and going back without saving will discard them.*/}
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

ConfirmDialog.displayName = "ConfirmDialog";
export default ConfirmDialog;