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
  successMessage?: string;
  failureMessage?: string;
};

export const DeletionDialog: FC<DeletionDialogProps> = ({
  title,
  description,
  isOpen,
  onOpenChange,
  onDelete,
  successMessage,
  failureMessage,
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
                if (successMessage) {
                  toast.info(successMessage);
                }
              } catch {
                if (failureMessage) {
                  toast.error(failureMessage);
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
