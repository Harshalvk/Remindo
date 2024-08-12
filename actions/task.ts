"use server";

import prisma from "@/lib/primsa";
import { createTaskSchemaType } from "@/schema/createTask";
import { getServerSession } from "next-auth";

const createTask = async (data: createTaskSchemaType) => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user?.email) {
    throw new Error("user not found");
  }

  const { content, collectionId, expiresAt } = data;

  return await prisma.task.create({
    data: {
      userId: user.email,
      content,
      expires: expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
};
