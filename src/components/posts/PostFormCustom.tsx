"use client";

import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Post, NewPostParams, insertPostParams } from "@/lib/db/schema/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";

export default function PostFormCustom({
    post,
    closeModal,
  }: {
    post?: Post;
    closeModal: () => void;
  }) {
  const form = useForm<z.infer<typeof insertPostParams>>({
    resolver: zodResolver(insertPostParams),
    defaultValues: post ?? {
      title: "",
      slug: "",
      content: "",
    },
  });

  const [count, setCount] = useState('');
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const wordCount = count.split(/\s+/).filter(word => word !== '').length;
  
  const handleInputCountChange = (e: any) => {
    const inputValue = e.target.value;
    if (wordCount <= 3) {
        setCount(inputValue);
    } else {
        setIsLimitExceeded(true)
    }
  };

  const handleKeyDown = (e: any) => {
    // Cho phép xóa nếu số từ vượt quá 300
    if (isLimitExceeded && e.key === 'Backspace') {
        setIsLimitExceeded(false);
        setCount('');
    }
  };
  
  const handleSubmit = (values: NewPostParams) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="header-modal flex items-center gap-2">
            <button className="absolute -top-12 flex p-2 flex-col items-start gap-1 self-stretch rounded-full w-full">
              <div className="flex gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                ></svg>
                <div className="flex-1 text-white text-center text-m font-semibold leading-[130%]">
                  Bài viết mới
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                ></svg>
              </div>
            </button>
          </div>
          <div className="article-creation flex flex-col items-start">
            <div className="flex justify-center items-start gap-2.5 self-stretch">
              <div className="flex py-4 pl-4 flex-col items-start">
                <div className="flex w-10 h-10 rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] bg-slate-200 flex-col justify-center items-center gap-2.5">
                  <img
                    src="/assets/image/avatar-post.jpg"
                    alt=""
                    className="w-full h-full rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px]"
                  />
                </div>
              </div>
              <div className="flex py-4 pr-4 flex-col items-start gap-2.5 flex-1">
                <div className="username text-slate-900 text-m font-semibold leading-[150%]">
                  _xmas.2024
                </div>
                <div className="flex items-start self-stretch">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl onChange={(e: any) => handleInputCountChange(e)}>
                          <Textarea
                            {...field}
                            placeholder="Hãy nêu cảm nghĩ của bạn ở đây..."
                            className="border-none"
                            onKeyDown={handleKeyDown}
                            readOnly={isLimitExceeded}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex py-2 px-4 flex-col justify-centeritemc rounded-full gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 2.5L6.3 2.5C4.61984 2.5 3.77976 2.5 3.13803 2.82698C2.57354 3.1146 2.1146 3.57354 1.82698 4.13803C1.5 4.77976 1.5 5.61984 1.5 7.3L1.5 15.7C1.5 17.3802 1.5 18.2202 1.82698 18.862C2.1146 19.4265 2.57354 19.8854 3.13803 20.173C3.77976 20.5 4.61984 20.5 6.3 20.5L15.5 20.5C16.43 20.5 16.895 20.5 17.2765 20.3978C18.3117 20.1204 19.1204 19.3117 19.3978 18.2765C19.5 17.895 19.5 17.43 19.5 16.5M17.5 7.5V1.5M14.5 4.5L20.5 4.5M9 8C9 9.10457 8.10457 10 7 10C5.89543 10 5 9.10457 5 8C5 6.89543 5.89543 6 7 6C8.10457 6 9 6.89543 9 8ZM13.49 11.4181L5.03115 19.108C4.55536 19.5406 4.31747 19.7568 4.29643 19.9442C4.27819 20.1066 4.34045 20.2676 4.46319 20.3755C4.60478 20.5 4.92628 20.5 5.56929 20.5L14.956 20.5C16.3951 20.5 17.1147 20.5 17.6799 20.2582C18.3894 19.9547 18.9547 19.3894 19.2582 18.6799C19.5 18.1147 19.5 17.3951 19.5 15.956C19.5 15.4717 19.5 15.2296 19.4471 15.0042C19.3805 14.7208 19.253 14.4554 19.0733 14.2264C18.9303 14.0442 18.7412 13.8929 18.3631 13.5905L15.5658 11.3527C15.1874 11.0499 14.9982 10.8985 14.7898 10.8451C14.6061 10.798 14.4129 10.8041 14.2325 10.8627C14.0279 10.9291 13.8486 11.0921 13.49 11.4181Z"
                      stroke="#334155"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex p-4 justify-end items-center gap-2.5 self-stretch">
            <span className={`${wordCount > 3 ? 'text-danger-500' : ''}`}>{wordCount}/300</span>
              <Button 
              className="flex py-2 px-4 flex-col justify-center items-center gap-1 self-stretch rounded-full bg-slate-900"
              type="submit"
              >
                <div className="flex gap-2">
                  <div className="text-white text-m font-semibold leading-[160%]">
                    Đăng tải
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
