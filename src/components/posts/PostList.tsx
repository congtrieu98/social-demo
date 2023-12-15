/* eslint-disable @next/next/no-async-client-component */
"use client";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialogAuth";
import { LoginFormModal } from "../general/form/LoginFormModal";
import { TypeFormModal } from "@/lib/constant/TypeFormModal";
import { SignupFormModal } from "../general/form/SignupFormMoadal";
import { ForgotForm } from "../general/form/ForgotForm";
import { useSession } from "next-auth/react";

export default async function PostList({ posts }: { posts: CompletePost[] }) {
  const { data: p } = trpc.posts.getPosts.useQuery(undefined, {
    initialData: { posts },
    refetchOnMount: false,
  });

  const [open, setOpen] = useState(false);
  const [typeFormModal, setTypeFormModal] = useState<TypeFormModal>(0);

  if (p.posts.length === 0) {
    return <EmptyState />;
  }

  const handleChangeModal = () => {
    setOpen(!open);
    setTypeFormModal(0);
  };

  return (
    <>
      <ul>
        {p.posts.map((post: CompletePost) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>

      <Dialog onOpenChange={handleChangeModal} open={open}>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="">
            {typeFormModal == 0 ? (
              <LoginFormModal setTypeFormModal={setTypeFormModal} />
            ) : typeFormModal == 1 ? (
              <SignupFormModal setTypeFormModal={setTypeFormModal} />
            ) : typeFormModal === 2 ? (
              <ForgotForm setTypeFormModal={setTypeFormModal} />
            ) : (
              ""
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
const Post = ({ post }: { post: CompletePost }) => {
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const [like, setLike] = useState(false);
  const onSuccess = async (action: "success" | "dislike") => {
    await utils.users.getUsers.refetch();
    await utils.posts.getPosts.refetch();
    router.refresh();
    toast({
      title: "Success",
      description: `${action === "success" ? "Like" : "Dislike"} successfully!`,
      variant: "default",
    });
    if (action === "dislike") {
      setLike(false);
    }

    if (action === "success") {
      setLike(true);
    }
  };
  const { mutate: likePost} = trpc.likes.createLike.useMutation({
    onSuccess: () => onSuccess("success"),
    // onSettled: () => trpc.posts.getPostById.useQuery({ id: post.id })
  });

  const { mutate: diskLikePost } = trpc.likes.deleteLike.useMutation({
    onSuccess: () => onSuccess("dislike"),
    // onSettled: () => trpc.posts.getPostById.useQuery({ id: post.id })
  });

  const { data: user } = trpc.users.getUserById.useQuery();
  const {
    data: isPostLiked,
    refetch,
    status,
  } = trpc.posts.getPostLiked.useQuery({ id: post.id });
  useEffect(() => {
    if (isPostLiked) {
      setLike(isPostLiked.checkPostLiked);
    }
  }, [isPostLiked]);

  const handleLikePost = (id: string) => {
    // if (session?.data == null && session?.status == 'unauthenticated') {
    //   console.log("vo day")
    //   router.push('/auth/signIn')
    // } else {
    const isLike = user?.likes.find(
      (item) => item?.userId === user?.id && item?.postId === id
    );
    if (isLike !== undefined && like === false) {
      console.log("isLikeeeeeee:", isLike)
      const likeId = isLike?.id;
      diskLikePost({
        id: likeId,
      });
      refetch()
    } else {
      console.log("isLikeeeeeee:", isLike)
      likePost({
        postId: id,
      });
      refetch()
    }
    // }
  };
  return (
    <li className="flex justify-between my-2">
      <div className="grid grid-cols-5 w-full space-x-3">
        <div className="w-full">
          <div>{post.title}</div>
        </div>
        <div className="w-full">
          <div>{post.slug}</div>
        </div>
        <div className="w-full">
          <div>{post.content}</div>
        </div>
        <Button className="w-1/2" onClick={() => handleLikePost(post.id)}>
          {status === "loading" ? "loading..." : like ? "Liked" : "Like"}
        </Button>
        <div className="w-full">
          <div>{post.likes.length} like</div>
        </div>
      </div>
      <PostModal post={post} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <PostModal emptyState={true} />
      </div>
    </div>
  );
};
