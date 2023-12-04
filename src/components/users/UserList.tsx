"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React from "react";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserList({ users }: { users: CompleteUser[] }) {
    const { data: session, status } = useSession()

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
    const session = useSession()
    const { toast } = useToast();
    const router = useRouter();
    const utils = trpc.useContext();

    const onSuccess = async (action: "create" | "update" | "delete" | "success" | "unfollow") => {
        await utils.users.getUsers.invalidate();
        router.refresh();
        toast({
          title: 'Success',
          description: `Follow ${action}d!`,
          variant: "default",
        });
      };

    const { mutate: followerUser } =
    trpc.users.createFollowUser.useMutation({
      onSuccess: () => onSuccess("success"),
    });

    const handleClickFollow = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        // Id people follow
        const followerId = session?.data?.user?.id as string
        // Id people followed
        const followedId = id
        // Kiểm tra người đi follow đã follow người đang định follow hay chưa
        
        //@ts-ignore
        const isFollowed = user?.followers.find(item => item.followedId === followedId && item.followerId === followerId);
        if (isFollowed) {
            toast({
              title: 'Confirmation',
              description: `You are already following this user. Do you want to unfollow?`,
              variant: "default",
              action: <Button >Unfollow</Button>, //onClick={() => unfollowUser({ id: isAlreadyFollowing.id })}
            });
          } else {
            followerUser({
              followerId: followerId,
              followedId: followedId,
            });
          }
    }
    return (
        <li className="flex justify-between my-2">
            <div className="w-full">
                <div>{user.name}</div>
            </div>
            <div className="w-full">
                <div>{user.email}</div>
            </div>
            <div className="w-full">
                <Button onClick={(e) => handleClickFollow(e, user.id)}>
                    { 
                    // @ts-ignore
                        user.followers.length > 0 ? "Following" : "Follow" 
                    }
                </Button>
            </div>
        </li >
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