"use server";
import { auth } from "@/auth";
import prisma from "@/lib/primsa";
import { createCollectionSchemaType } from "@/schema/createCollection";

export async function createCollection(form: createCollectionSchemaType) {
  const session = await auth();
  console.log(JSON.stringify(session));
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
  const session = await auth();
  if (!session?.user) {
    throw new Error("User not found");
  }

  return await prisma.collection.delete({
    where: {
      id: id,
    },
  });
}
