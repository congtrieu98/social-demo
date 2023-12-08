"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import UserAlert from "./UserAlert";
import { useSession } from "next-auth/react";

export default function UserList({ users }: { users: CompleteUser[] }) {
  const { data: user } = trpc.users.getUsers.useQuery(undefined, {
    initialData: { users },
    refetchOnMount: false,
  });
  

  if (user.users.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {user.users.map((user: CompleteUser) => (
        <User user={user} key={user.id} />
      ))}
    </ul>
  );
}

const User = ({ user }: { user: CompleteUser }) => {
  const session = useSession()
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const [following, setFollowing] = useState(false)

  const onSuccess = async (
    action: "success" | "unfollow"
  ) => {
    await utils.users.getUsers.invalidate();
    router.refresh();
    toast({
      title: "Success",
      description: `Follow ${action}fully!`,
      variant: "default",
    });
    if (action === 'success') {
      setFollowing(true);
    }
  };

  const { mutate: followerUser } = trpc.users.createFollowUser.useMutation({
    onSuccess: () => onSuccess("success"),
  });

  const {  data: isFollowing, error, status, refetch } = trpc.users.getUserFollowes.useQuery({followedId: user?.id})

  useEffect(() => {
    if (isFollowing) {
      setFollowing(isFollowing?.checkFollow)
    }

  }, [isFollowing])

  const handleClickFollow = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // Id của mình
    const followerId = session.data?.user?.id as string;
    // Id của người mình follow()
    const followedId = id;

    // @ts-ignore
    const isFollowed = user?.followers.find((item) => item.followedId === followedId && item.followerId === followerId);
    if (isFollowed && typeof isFollowed !== 'undefined') {
      console.log('Đã follow')
    } else {
      await followerUser({
        followerId: followerId, // Người follow mình
        followedId: followedId, // Người mình đã follow
      });
    }
    refetch()
  };
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{user.name}</div>
      </div>
      <div className="w-full">
        <div>{user.email}</div>
      </div>
      <div className="w-full">
        {
          // @ts-ignore
          following ? (
            <UserAlert id={
              // @ts-ignore
              (user.followers?.find(item => item?.followedId === user?.id))?.id as string
            }
            following={following}
            setFollowing={setFollowing}
            />
          ) : 
          (<Button onClick={(e) => handleClickFollow(e, user.id)}>
            {status === 'loading' ? 'Loading...' : 'Follow'}
          </Button>
          )}
      </div>
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No User</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new User.
      </p>
    </div>
  );
};
