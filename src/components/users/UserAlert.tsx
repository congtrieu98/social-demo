"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";

export default function UserAlert({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

  const onSuccess = async (
    action: "create" | "update" | "delete" | "success" | "unfollow"
  ) => {
    await utils.users.getUsers.invalidate();
    router.refresh();
    toast({
      title: "Success",
      description: `unFollow ${action}fully!`,
      variant: "default",
    });
  };
  const { mutate: unfollowUser } = trpc.users.unFollowUser.useMutation({
    onSuccess: () => onSuccess("success"),
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Unfollow</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure unfollow this user?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => unfollowUser({ id: id })}>Continute</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
