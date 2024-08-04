"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                height={30}
                width={40}
                src={session?.user?.image!}
                alt="user profile"
                className="rounded-full"
              />
              <p className="">{session?.user?.name}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button
                onClick={() => signOut()}
                variant={"ghost"}
                className="w-full h-2"
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default UserButton;
