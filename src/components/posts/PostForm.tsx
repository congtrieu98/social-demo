"use client";

import { Post, NewPostParams, insertPostParams } from "@/lib/db/schema/posts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const PostForm = ({
  post,
  closeModal,
}: {
  post?: Post;
  closeModal: () => void;
}) => {
  const { toast } = useToast();
  
  const editing = !!post?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPostParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPostParams),
    defaultValues: post ?? {
      title: "",
     slug: "",
     content: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.posts.getPosts.invalidate();
    router.refresh();
    closeModal();toast({
      title: 'Success',
      description: `Post ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createPost, isLoading: isCreating } =
    trpc.posts.createPost.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updatePost, isLoading: isUpdating } =
    trpc.posts.updatePost.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deletePost, isLoading: isDeleting } =
    trpc.posts.deletePost.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewPostParams) => {
    if (editing) {
      updatePost({ ...values, id: post.id });
    } else {
      createPost(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (<FormItem>
              <FormLabel>Title</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (<FormItem>
              <FormLabel>Slug</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
              <FormLabel>Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deletePost({ id: post.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PostForm;
