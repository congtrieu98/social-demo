/* eslint-disable @next/next/no-img-element */
"use client";

import { Feed, NewFeedParams, insertFeedParams } from "@/lib/db/schema/feeds";
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
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { uploadVercel } from "@/lib/utils";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface FileWithPreview extends File {
  preview?: string;
  loading?: boolean;
  path?: string;
}

const FeeForm = ({
  feed,
  closeModal,
}: {
  feed?: Feed;
  closeModal: () => void;
}) => {
  const { toast } = useToast();

  const editing = !!feed?.id;

  const router = useRouter();
  const utils = trpc.useContext();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof insertFeedParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedParams),
    defaultValues: feed ?? {
      content: "",
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.feeds.getFeeds.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Fee ${action}d!`,
      variant: "default",
    });
  };

  const mutation = trpc.medias.createMedia.useMutation();
  const { mutate: createFee, isLoading: isCreating } =
    trpc.feeds.createFeed.useMutation({
      onSuccess: async ({ feed }) => {
        if (files.length > 0 && feed) {
          files.forEach((file: FileWithPreview) => {
            if (file.preview) {
              const feedId = feed.id;
              mutation.mutate({ feedId: feedId, url: file.preview });
            }
          });
          onSuccess("create");
        }
      }
    });

  const { mutate: updateFee, isLoading: isUpdating } =
    trpc.feeds.updateFeed.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteFee, isLoading: isDeleting } =
    trpc.feeds.deleteFeed.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const onDrop = useCallback((acceptedFiles: Array<FileWithPreview>) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file => ({ ...file, loading: true }))
      ]);

      acceptedFiles.forEach((file, index) => {
        uploadVercel(file).then(url => {
          setFiles(previousFiles => previousFiles.map((prevFile, prevIndex) => {
            if (prevIndex === index + previousFiles.length - acceptedFiles.length) {
              return { ...prevFile, preview: url, loading: false };
            } else {
              return prevFile;
            }
          }));
        });
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  const handleSubmit = (values: NewFeedParams) => {
    if (editing) {
      updateFee({ ...values, id: feed.id });
    } else {
      createFee(values);
    }
  };

  useEffect(() => {
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview as string)
      );
  }, [files]);

  const removeFile = (path: string) => {
    // @ts-ignore
    setFiles((files) => files.filter((file) => file.path !== path));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>Image</div>
        <section className="border border-gray-100 p-5 rounded-xl shadow-md">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </div>
          {/* Accepted files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {files.map((file: FileWithPreview, index) => (
              <li
                key={index}
                className="relative h-[100px] rounded-md shadow-lg"
              >
                {file.loading ? (
                  <svg className="absolute top-10 right-6 animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="black" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <img
                    src={file.preview}
                    alt={file.name}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview as string);
                    }}
                    className="h-[100px] w-[100px] object-contain rounded-md"
                  />
                )}

                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 transition-colors bg-red-500"
                  onClick={() => removeFile(file.path as string)}
                >
                  <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                </button>
                <div className=" text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </div>
              </li>
            ))}
          </ul>
        </section>
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
            onClick={() => deleteFee({ id: feed.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeeForm;