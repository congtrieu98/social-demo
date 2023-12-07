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
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Feed } from "@/lib/db/schema/feeds";
import { Media } from "@/lib/db/schema/medias";

export default function FeedAlert({ id, feed }: { id: string; feed: Feed }) {
  const { toast } = useToast();
  const router = useRouter();

  //   const onSuccess = async () => {
  //     await utils.users.getUsers.invalidate();
  //     router.refresh();
  //     toast({
  //       title: "Success",
  //       description: 'Delete image successfully',
  //       variant: "default",
  //     });
  //   };
  //     const { mutate: deleteFee, isLoading: isDeleting } =
  //     trpc.medias.deleteMedia.useMutation({
  //       onSuccess: () =>  onSuccess(),

  //     });

  const mutionDeleteMedia = trpc.medias.deleteMedia.useMutation();
  const removeFileByFeedId = (id: string) => {
    // @ts-ignore
    const findMedia = feed?.medias.find((item: Media) => item.id === id);
    if (findMedia) {
      console.log(findMedia);
      mutionDeleteMedia.mutate({ id: findMedia?.id });
      router.refresh();
      toast({
        title: "Success",
        description: "Delete image successfully",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Không tìm thấy image",
        variant: "default",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 transition-colors bg-red-500"
        >
          <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure delete this image?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => removeFileByFeedId(id)}>Ok</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
