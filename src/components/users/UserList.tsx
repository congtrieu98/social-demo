"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import UserAlert from "./UserAlert";

export default function UserList({ users }: { users: CompleteUser[] }) {

  const { data: u } = trpc.users.getUsers.useQuery(undefined, {
    initialData: { users },
    refetchOnMount: false,
  });

  if (u.users.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.users.map((user: CompleteUser) => (
        <User user={user} key={user.id} />
      ))}
    </ul>
  );
}

const User = ({ user }: { user: CompleteUser }) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
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
  };

  const { mutate: followerUser, isLoading: isFollowing } = trpc.users.createFollowUser.useMutation({
    onSuccess: () => onSuccess("success"),
  });

  const handleClickFollow = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // Id people follow
    const followerId = user?.id as string;
    // Id people followed
    const followedId = id;
    // Kiểm tra người đi follow đã follow người đang định follow hay chưa
    
    // @ts-ignore
    const isFollowed = user?.followers.find((item) => item.followedId === followedId && item.followerId === followerId);
    if (!isFollowed) {
      followerUser({
        followerId: followerId,
        followedId: followedId,
      });
    }
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
        user.followers.length > 0 ? (
          <UserAlert id={
            // @ts-ignore
            (user.followers?.find(item => item?.followedId === user?.id))?.id as string
        } />
        ) : (<Button onClick={(e) => handleClickFollow(e, user.id)}>
            Follo{isFollowing ? 'wing...' : 'w'}
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
