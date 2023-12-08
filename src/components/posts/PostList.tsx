"use client";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function PostList({ posts }: { posts: CompletePost[] }) {
  const { data: p } = trpc.posts.getPosts.useQuery(undefined, {
    initialData: { posts },
    refetchOnMount: false,
  });

  if (p.posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.posts.map((post: CompletePost) => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
}
const Post = ({ post }: { post: CompletePost }) => {
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

  const onSuccess = async (
    action: "success" | "dislike"
  ) => {
    await utils.users.getUsers.invalidate();
    router.refresh();
    toast({
      title: "Success",
      description: `Like ${action}fully!`,
      variant: "default",
    });
   
  };
  const { mutate: likePost } = trpc.likes.createLike.useMutation({
    onSuccess: () => onSuccess("success"),
  });

  const { data: user, error, refetch, status} = trpc.users.getUserById.useQuery()
  const handleLikePost = (id: string) => {
    // const userSession = session.data?.user
    // const userId = userSession?.id as string;
    // @ts-ignore
    const isLike = user?.likes.find(item => item?.userId === userId && item?.postId === id)
    if (isLike !== undefined) {
      console.log("da like")
    } else {
      likePost({
        postId: id,
      })
    }
  };
  return (
    <li className="flex justify-between my-2">
      <div className="grid grid-cols-4 w-full space-x-3">
        <div className="w-full">
          <div>{post.title}</div>
        </div>
        <div className="w-full">
          <div>{post.slug}</div>
        </div>
        <div className="w-full">
          <div>{post.content}</div>
        </div>
        <Button className="w-1/4" onClick={() => handleLikePost(post.id)}>
          {}
        </Button>
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
