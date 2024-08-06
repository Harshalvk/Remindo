"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";

const CreateCollectionBtn = () => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (open:boolean) => setOpen(open)
  return (
    <div className="w-full rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 p-[1px]">
      <Button
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r text-md font-bold from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Create Collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange}/>
    </div>
  );
};

export default CreateCollectionBtn;
