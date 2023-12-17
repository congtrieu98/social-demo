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
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const [like, setLike] = useState(false);
  const onSuccess = async (action: "success") => {
    await utils.users.getUsers.invalidate();
    router.refresh();
    if (action == "success") {
      if (like) {
        setLike(false);
        toast({
          title: "Success",
          description: "Dislike successfully!",
          variant: "default",
        });
      } else {
        setLike(true);
        toast({
          title: "Success",
          description: "Like successfully!",
          variant: "default",
        });
      }
    }
  };
  const { mutate: likePost } = trpc.likes.createLike.useMutation({
    onSuccess: () => onSuccess("success"),
    onSettled: () => trpc.posts.getPosts.useQuery()
  });

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

  console.log("postttttt:", post)
  const handleLikePost = (id: string) => {
    console.log(id)
    likePost({
      postId: id,
    });
    // if (session?.data == null && session?.status == 'unauthenticated') {
    //   console.log("vo day")
    //   router.push('/auth/signIn')
    // } else {
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
