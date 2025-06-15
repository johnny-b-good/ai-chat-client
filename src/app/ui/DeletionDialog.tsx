"use client";

import { type FC } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";

export type DeletionDialogProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDelete: () => Promise<void>;
  deletionSuccessMessage?: string;
  deletionFailureMessage?: string;
};

export const DeletionDialog: FC<DeletionDialogProps> = ({
  title,
  description,
  isOpen,
  onOpenChange,
  onDelete,
  deletionSuccessMessage,
  deletionFailureMessage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={async () => {
              try {
                await onDelete();
                if (deletionSuccessMessage) {
                  toast.info(deletionSuccessMessage);
                }
              } catch {
                if (deletionFailureMessage) {
                  toast.error(deletionFailureMessage);
                }
              } finally {
                onOpenChange(false);
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
