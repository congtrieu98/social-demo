"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React from "react";

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
    const handleClickFollow = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        console.log(id)
        // console.log(user?.followers)

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
                <Button onClick={(e) => handleClickFollow(e, user.id)}>Follow</Button>
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