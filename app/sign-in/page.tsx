"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DiscIcon, GithubIcon, ShieldHalf } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const signInpage = () => {
  const session = useSession();
  const router = useRouter();
  useLayoutEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);
  return (
    <Card className="w-96 text-center">
      <CardHeader>
        <CardTitle>Sign In to your account</CardTitle>
        <CardDescription>Start your journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button variant={"default"} className="shadow-sm w-full">
          Continue
        </Button>
      </CardContent>
      <CardContent className="space-y-5">
        <CardDescription>Or sign in with</CardDescription>
        <Separator />
        <div className="w-full flex justify-between gap-2">
          <Button className="flex-1">
            <GithubIcon />
          </Button>
          <Button className="flex-1" onClick={() => signIn("google")}>
            <ShieldHalf />
          </Button>
          <Button className="flex-1">
            <DiscIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default signInpage;
