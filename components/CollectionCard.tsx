"use client";
import { Collection, Task } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { deleteCollection } from "@/actions/collection";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import CreateTaskDialog from "./CreateTaskDialog";

type Props = {
  collection: Collection & {
    tasks: Task[];
  };
};

const CollectionCard = ({ collection }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const [isLoading, startTransition] = useTransition();

  const tasks = collection.tasks;

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast.success("Success", {
        description: "Collection deleted successfully!",
      });
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: "Cannot delete collection",
      });
      console.log("🚨Error while deleting collection", error);
    }
  };

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col rounded-b-md dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && <div>No tasks</div>}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none h-1" value={45} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <div key={task.id}>{task.content}</div>
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && (
              <div className="flex items-center gap-1">
                <LoaderCircle className="h-4 animate-spin" />
                <p>Deleting</p>
              </div>
            )}
            {!isLoading && (
              <div>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => setShowCreateTaskModal(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your collection and all task inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancle</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => startTransition(removeCollection)}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default CollectionCard;
