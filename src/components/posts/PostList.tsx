"use client";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import LoginForm from "../auth/login/LoginForm";
import Link from "next/link";

export default function PostList({ posts }: { posts: CompletePost[] }) {
  const { data: p } = trpc.posts.getPosts.useQuery(undefined, {
    initialData: { posts },
    refetchOnMount: false,
  });

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (p.posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <ul>
        {p.posts.map((post: CompletePost) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col pt-8 w-full max-w-lg transform rounded-2xl bg-white items-center justify-center gap-5 shadow-xl transition-all">
                  <button className="absolute -top-12 flex p-2 flex-col items-start gap-1 self-stretch rounded-full w-full">
                    <div className="flex gap-2 w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      ></svg>
                      <div className="flex-1 text-white text-center text-[15px] font-semibold leading-6">
                        Đăng nhập
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        onClick={closeModal}
                      >
                        <path
                          d="M13.5 1L1.5 13M1.5 1L13.5 13"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="flex flex-col gap-5">
                    <div className="text-left flex flex-col gap-2.5">
                      <div className="text-2xl font-semibold leading-7 text-slate-700 ">
                        Chào mừng đến SuZu nà!
                      </div>
                      <div className="text-xs font-normal text-slate-500">
                        Mạng xã hội để giải trí và vui chơi thoải mái nhưng hãy
                        <br />
                        <span className="text-gray-900 text-xs underline font-semibold">
                          có chơi có chịu
                        </span>{" "}
                        khi chia sẻ những suy nghĩ của{" "}
                        <span className="text-gray-700 text-xs font-normal">
                          bản thân
                        </span>{" "}
                        mình!
                      </div>
                    </div>

                    <div className="flex flex-col  gap-2.5">
                      <button className="flex p-2 flex-col items-start gap-1 self-stretch rounded-full border border-slate-100 w-full">
                        <div className="flex gap-2 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M20.3055 8.0415H19.5V8L10.5 8V12L16.1515 12C15.327 14.3285 13.1115 16 10.5 16C7.1865 16 4.5 13.3135 4.5 10C4.5 6.6865 7.1865 4 10.5 4C12.0295 4 13.421 4.577 14.4805 5.5195L17.309 2.691C15.523 1.0265 13.134 0 10.5 0C4.9775 0 0.5 4.4775 0.5 10C0.5 15.5225 4.9775 20 10.5 20C16.0225 20 20.5 15.5225 20.5 10C20.5 9.3295 20.431 8.675 20.3055 8.0415Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M1.65308 5.3455L4.93858 7.755C5.82758 5.554 7.98058 4 10.5001 4C12.0296 4 13.4211 4.577 14.4806 5.5195L17.3091 2.691C15.5231 1.0265 13.1341 0 10.5001 0C6.65908 0 3.32808 2.1685 1.65308 5.3455Z"
                              fill="#FF3D00"
                            />
                            <path
                              d="M10.4999 20.0001C13.0829 20.0001 15.4299 19.0116 17.2044 17.4041L14.1094 14.7851C13.1054 15.5456 11.8574 16.0001 10.4999 16.0001C7.89891 16.0001 5.69041 14.3416 4.85841 12.0271L1.59741 14.5396C3.25241 17.7781 6.61341 20.0001 10.4999 20.0001Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M20.3055 8.0415H19.5V8L10.5 8V12L16.1515 12C15.7555 13.1185 15.036 14.083 14.108 14.7855L14.1095 14.7845L17.2045 17.4035C16.9855 17.6025 20.5 15 20.5 10C20.5 9.3295 20.431 8.675 20.3055 8.0415Z"
                              fill="#1976D2"
                            />
                          </svg>
                          <div className="flex-1 text-slate-900 text-center text-[15px] font-semibold leading-6">
                            Google
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          ></svg>
                        </div>
                      </button>
                      <button className="flex p-2 flex-col items-start gap-1 self-stretch rounded-full border border-slate-100 w-full">
                        <div className="flex gap-2 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.5 9.875C0.5 4.42104 4.977 0 10.5 0C16.023 0 20.5 4.42104 20.5 9.875C20.5 14.8576 16.7635 18.9781 11.9064 19.6531L11.9064 12.7171L14.4978 12.7171L14.9048 10.1119L11.9064 10.1119V8.68793C11.9064 7.60582 12.2639 6.64609 13.2867 6.64609H14.9304V4.37288L14.9167 4.37105C14.6224 4.33164 14.0128 4.25 12.8767 4.25C10.4665 4.25 9.05367 5.50948 9.05367 8.37925V10.1124H6.57593L6.57593 12.7176H9.05317L9.05317 19.6474C4.21583 18.9552 0.5 14.8437 0.5 9.875Z"
                              fill="url(#paint0_linear_6034_5822)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_6034_5822"
                                x1="3.4965"
                                y1="2.95904"
                                x2="18.6149"
                                y2="18.2688"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#2AA4F4" />
                                <stop offset="1" stop-color="#007AD9" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="flex-1 text-slate-900 text-center text-[15px] font-semibold leading-6">
                            Facebook
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          ></svg>
                        </div>
                      </button>
                      <div className="flex justify-center items-center gap-2.5 self-stretch">
                        <div className="flex flex-1 items-start gap-1 rounded-full bg-slate-100 h-[1px]" />
                        <div className="text-slate-500 text-xs font-normal leading-4 ">
                          hoặc
                        </div>
                        <div className="flex flex-1 items-start gap-1 rounded-full bg-slate-100 h-[1px]" />
                      </div>
                      <div className="w-full">
                        <LoginForm />
                      </div>
                    </div>
                  </div>

                  <div className="flex px-4 pt-3 pb-6 justify-center items-center border-t border-slate-100 w-full">
                    <div className="flex text-slate-500 text-center">
                      Bạn vẫn chưa có tài khoản 🙄?{" "}
                      <Link
                        href="/"
                        className="text-slate-900 text-[15px] font-semibold leading-6"
                      >
                        {" "}
                        Đăng ký
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
const Post = ({ post }: { post: CompletePost }) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const [like, setLike] = useState(false);
  const onSuccess = async (action: "success" | "dislike") => {
    await utils.users.getUsers.invalidate();
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
  const { mutate: likePost } = trpc.likes.createLike.useMutation({
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
  }, [isPostLiked, post]);

  let [isOpen, setIsOpen] = useState(true);

  const handleCloseodal = () => {
    setIsOpen(false);
  };
  const handleLikePost = (id: string) => {
    const isLike = user?.likes.find(
      (item) => item?.userId === user?.id && item?.postId === id
    );
    if (isLike !== undefined) {
      const likeId = isLike?.id;
      diskLikePost({
        id: likeId,
      });
      refetch();
    } else {
      likePost({
        postId: id,
      });
      refetch();
    }
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
