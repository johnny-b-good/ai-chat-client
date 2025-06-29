"use client";

import {
  useState,
  useEffect,
  useTransition,
  useRef,
  type FC,
  type FormEvent,
} from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  Textarea,
} from "@/components/ui";
import { summarizeChat, updateChat } from "../lib/actions";
import { type Chat } from "@/generated/prisma";

type ChatSummaryFormProps = {
  chat: Chat;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const ChatSummaryForm: FC<ChatSummaryFormProps> = ({
  chat,
  isOpen,
  onOpenChange,
}) => {
  const [name, setName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  const [isSummarizingChat, startSummarizingChat] = useTransition();
  const [isUpdatingChat, startUpdatingChat] = useTransition();

  const isDisabled = isSummarizingChat || isUpdatingChat;

  useEffect(() => {
    setName(chat.name);
    setSummary(chat.summary ?? "");
  }, [chat]);

  const onFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startUpdatingChat(async () => {
        // TODO: Show field errors in the form
        const errors = await updateChat(chat.id, formData);
        if (!errors) {
          onOpenChange(false);
          toast.info("The chat summary is successfully updated");
        } else {
          toast.error("Failed to update chat summary");
        }
      });
    }
  };

  const onGenerateButtonClick = () => {
    startSummarizingChat(async () => {
      const result = await summarizeChat(chat.id);
      if (result.status === "ok") {
        setName(result.name);
        setSummary(result.summary);
        toast.info("The chat summary is successfully generated");
      } else {
        toast.error("Failed to generate chat summary");
      }
    });
  };

  const onOpenChangeWithReset = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setName(chat.name);
      setSummary(chat.summary ?? "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChangeWithReset}>
      <DialogContent>
        <form ref={formRef} onSubmit={onFormSubmit}>
          <DialogHeader>
            <DialogTitle>Update chat</DialogTitle>
            <DialogDescription>
              Update name and summary of the chat.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                required
                value={name}
                disabled={isDisabled}
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                name="summary"
                value={summary}
                onChange={(ev) => {
                  setSummary(ev.target.value);
                }}
                disabled={isDisabled}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onGenerateButtonClick}
              disabled={isDisabled}
            >
              {isSummarizingChat ? (
                <>
                  <Loader2Icon className="animate-spin" /> Generating…
                </>
              ) : (
                "Generate with AI"
              )}
            </Button>

            <div className="flex-1" />

            <DialogClose asChild>
              <Button variant="outline" disabled={isDisabled}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isDisabled}>
              {isUpdatingChat ? (
                <>
                  <Loader2Icon className="animate-spin" /> Saving…
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
