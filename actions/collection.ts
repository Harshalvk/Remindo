"use server";
import prisma from "@/lib/primsa";
import { createCollectionSchemaType } from "@/schema/createCollection";
import { getServerSession } from "next-auth";

export async function createCollection(form: createCollectionSchemaType) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("User not found");
  }

  return await prisma.collection.create({
    data: {
      userId: session.user.email!,
      color: form.color,
      name: form.name,
    },
  });
}

export async function deleteCollection(id: number) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error("User not found");
  }

  return await prisma.collection.delete({
    where: {
      id: id
    },
  });
}
