import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/primsa";
import { wait } from "@/lib/wait";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

const WelcomeMsg = async () => {
  const session = await getServerSession();
  await wait(3000);

  if (!session?.user) {
    return <p>Not Authorized</p>;
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br />
        <p>{session.user?.name}</p>
      </h1>
    </div>
  );
};

const WelcomeMsgFallback = () => {
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold mb-12">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
};

const CollectionList = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.email!,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collection yet!</AlertTitle>
          <AlertDescription>Create a collection to get started</AlertDescription>
        </Alert>
        <CreateCollectionBtn/>
      </div>
    );
  }

  return(
    <div>
      Collections: {collections.length}
      <CreateCollectionBtn/>
    </div>
  )
};
