/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { useToast } from "../ui/use-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Link from "next/link";
import { Input } from "../ui/input";
import { getUserAuth } from "@/lib/auth/utils";

interface ISlide {
  id: number
  name: string
  image: string
}
export default async function HomeComponent() {
  const { session } = await getUserAuth();
  const [readmore, setReadmore] = useState(true);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<ISlide>();

  const listSlide = [
    {
      id: 1,
      name: "slide 1",
      image: "/assets/image/avatar-post.jpg",
    },
    {
      id: 2,
      name: "slide 2",
      image: "/assets/image/image-1.jpg",
    },
    {
      id: 3,
      name: "slide 3",
      image: "/assets/image/image-2.jpg",
    },
    {
      id: 4,
      name: "slide 4",
      image: "/assets/image/image-3.jpg",
    },
    {
      id: 5,
      name: "slide 5",
      image: "/assets/image/image-4.jpg",
    },
  ];

  const handleCopyUrl = async () => {
    // Lấy URL hiện tại của trang
    const url = window.location.href;
    navigator.clipboard.writeText(url)
    toast({
      title: "Success",
      description: "!URL đã được sao chép!",
      variant: "default",
    });
  };

  const handleChangeModal = () => {
    setOpen(!open)

  }

  const renderItem = (slide: ISlide) => {
    // console.log("options:", )
    return (
      < Dialog onOpenChange={handleChangeModal} open={open} >
        <DialogTrigger
          asChild
          onClick={() => setSelectedSlide(slide)}
        >
          <div className="cursor-pointer">
            <div className="flex space-x-4">
              <img
                src={slide.image}
                alt={slide.image}
                className="h-full w-full object-contain rounded-md"

              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="flex space-x-4">
            <img
              src={selectedSlide?.image}
              alt={selectedSlide?.image}
              className="h-full w-full object-contain rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog >
    )
  }

  return (
    <>
      {/* {
        session &&
        <div className="flex flex-col items-start">
          <div className="flex p-4 flex-col gap-2 self-stretch rounded-[20px] bg-white">
            <div className="flex items-center gap-2">
              <div className="avatar flex w-10 h-10 rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] bg-slate-200 flex-col justify-center items-center gap-2.5">
                <img
                  src="/assets/image/avatar-post.jpg"
                  alt=""
                  className="w-full h-full rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px]"
                />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div className="flex items-start flex-1">
                  <Input placeholder="Placeholder" className="border-none" />
                </div>
                <div className="flex py-2 px-4 flex-col justify-centeritemc rounded-full gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2.5L6.3 2.5C4.61984 2.5 3.77976 2.5 3.13803 2.82698C2.57354 3.1146 2.1146 3.57354 1.82698 4.13803C1.5 4.77976 1.5 5.61984 1.5 7.3L1.5 15.7C1.5 17.3802 1.5 18.2202 1.82698 18.862C2.1146 19.4265 2.57354 19.8854 3.13803 20.173C3.77976 20.5 4.61984 20.5 6.3 20.5L15.5 20.5C16.43 20.5 16.895 20.5 17.2765 20.3978C18.3117 20.1204 19.1204 19.3117 19.3978 18.2765C19.5 17.895 19.5 17.43 19.5 16.5M17.5 7.5V1.5M14.5 4.5L20.5 4.5M9 8C9 9.10457 8.10457 10 7 10C5.89543 10 5 9.10457 5 8C5 6.89543 5.89543 6 7 6C8.10457 6 9 6.89543 9 8ZM13.49 11.4181L5.03115 19.108C4.55536 19.5406 4.31747 19.7568 4.29643 19.9442C4.27819 20.1066 4.34045 20.2676 4.46319 20.3755C4.60478 20.5 4.92628 20.5 5.56929 20.5L14.956 20.5C16.3951 20.5 17.1147 20.5 17.6799 20.2582C18.3894 19.9547 18.9547 19.3894 19.2582 18.6799C19.5 18.1147 19.5 17.3951 19.5 15.956C19.5 15.4717 19.5 15.2296 19.4471 15.0042C19.3805 14.7208 19.253 14.4554 19.0733 14.2264C18.9303 14.0442 18.7412 13.8929 18.3631 13.5905L15.5658 11.3527C15.1874 11.0499 14.9982 10.8985 14.7898 10.8451C14.6061 10.798 14.4129 10.8041 14.2325 10.8627C14.0279 10.9291 13.8486 11.0921 13.49 11.4181Z" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      } */}
      <div className="article flex max-w-full flex-col py-4 items-start gap-2.5 rounded-[20px] bg-white">
        <div className="article-header flex px-4 justify-between items-start self-stretch">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex w-10 h-10 flex-col items-start">
              <div className="flex rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] bg-slate-200 flex-col justify-center items-center gap-2.5">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <img
                      src="/assets/image/avatar-post.jpg"
                      alt=""
                      className="w-full h-full rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px]"
                    />
                    {/* <div className="text-slate-900 text-m font-normal leading-6">
                    AB
                  </div> */}
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96">
                    <div className="flex gap-2.5 flex-col">
                      <div className="flex items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <div className="flex flex-col items-start">
                            <div className="self-stretch text-slate-900 text-[29px] font-normal leading-[130%]">
                              Trần Đình Khánh 🫡
                            </div>
                            <div className="self-stretch text-slate-900 text-m font-normal leading-[150%]">
                              @dinhkhanh_szg
                            </div>
                          </div>
                          <div className="row flex items-start gap-4 self-stretch">
                            <div className="row-item flex items-baseline gap-1">
                              <div className="text-slate-900 text-m font-semibold leading-[150%]">
                                16
                              </div>
                              <div className="text-slate-900 text-xs font-normal leading-[150%]">
                                Người theo dõi
                              </div>
                            </div>
                            <div className="row-item flex items-baseline gap-1">
                              <div className="text-slate-900 text-m font-semibold leading-[150%]">
                                16
                              </div>
                              <div className="text-slate-900 text-xs font-normal leading-[150%]">
                                Đang theo dõi
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex w-[61px] h-[61px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] bg-slate-200 flex-col justify-center items-center gap-2.5">
                          <img
                            src="/assets/image/avatar-post.jpg"
                            alt=""
                            className="w-full h-full rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px]"
                          />
                        </div>
                      </div>

                      <div className="self-stretch text-slate-900 text-m font-normal leading-[150%]">
                        All good things are wild and free..
                      </div>

                      <div className="follow-button flex h-10 flex-col self-stretch">
                        <Button
                          className="flex p-2 w-full flex-col justify-center items-center gap-1 self-stretch rounded-full bg-slate-900"
                        >
                          <div className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                            ></svg>
                            <div className="text-white text-m font-semibold leading-[160%]">
                              Theo dõi
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                            ></svg>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Button
                className="absolute right-0 bottom-0 w-5 h-5 flex p-2 flex-col justify-center items-start gap-1 self-stretch rounded-full bg-slate-900"
                type="submit"
              >
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  ></svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="absolute left-1 top-1"
                  >
                    <path
                      d="M6.00001 1.33334L6.00001 10.6667M1.33334 6.00001L10.6667 6.00001"
                      stroke="white"
                      stroke-width="1.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  ></svg>
                </div>
              </Button>
            </div>
            <div className="text-slate-900 text-m font-semibold leading-[150%]">
              Display name
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-slate-500 text-m font-normal leading-6">
              1 ngày
            </div>
            <div className="flex px-2 flex-col items-start">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {/* <Avatar>
                  <AvatarFallback> */}
                  <Button className="flex p-2 flex-col justify-center items-start gap-1 self-stretch rounded-full">
                    <div className="flex gap-2 items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="4"
                        viewBox="0 0 18 4"
                        fill="none"
                        className="mt-2.5"
                      >
                        <path
                          d="M9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2C8 2.55228 8.44772 3 9 3Z"
                          fill="#0F172A"
                        />
                        <path
                          d="M16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3Z"
                          fill="#0F172A"
                        />
                        <path
                          d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                          fill="#0F172A"
                        />
                        <path
                          d="M9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2C8 2.55228 8.44772 3 9 3Z"
                          stroke="#0F172A"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3Z"
                          stroke="#0F172A"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                          stroke="#0F172A"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </Button>
                  {/* </AvatarFallback>
                </Avatar> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <Link href="/">
                    <DropdownMenuItem className="cursor-pointer">
                      Trang cá nhân
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/s">
                    <DropdownMenuItem className="cursor-pointer">
                      Theo dõi
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/">
                    <DropdownMenuItem className="cursor-pointer">
                      Lưu bài viết
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/">
                    <DropdownMenuItem className="cursor-pointer text-danger-500">
                      Báo cáo vi phạm
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* End  article-header*/}

        <div className="paragraph flex px-4 items-start flex-col self-stretch">
          <div
            className={`${readmore ? "suzu_truncate-2" : ""
              } text-slate-900 text-m font-normal leading-[150%]`}
          >
            Leo quis ultrices amet in eget amet gravida. Nunc id ut egestas
            condimentum. Integer vitae orci mauris est posuere ullamcorper dui
            nec. Diam quis sagittis amet faucibus malesuada. Nibh consectetur
            pellentesque tellus maecenas enim. Purus blandit amet sapien vel urna
            non viverra ultrices. Ut curabitur augue a nunc. Ac mollis tristique
            gravida amet vulputate. Tincidunt sed nibh feugiat urna porttitor eget
            libero. In mauris nibh lacus eget id faucibus sollicitudin ut. Mollis
            viverra diam urna tempor tincidunt.
          </div>
          <Button
            className="flex p-2 flex-col gap-1 rounded-full "
            onClick={() => setReadmore(!readmore)}
          >
            <div className="flex gap-2">
              <div className="text-slate-500 text-m font-normal leading-6">
                Xem thêm
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              ></svg>
            </div>
          </Button>
        </div>
        {/* End paragraph */}

        <div className="article-image">
          {/* <video className='w-full h-full object-cover'>
          <source src="https://www.youtube.com/watch?v=PeXV-4CldnA&t=546s" />
          Your browser does not support the video tag.
        </video> */}
          <Carousel
            showThumbs={false}
            swipeable={true}
            centerMode
            showStatus={false}>
            {listSlide.map((slide, index) => (
              <div key={index}>
                {renderItem(slide)}
              </div>
            ))}
          </Carousel>
        </div>
        {/* End article image */}

        <div className="label flex px-4 items-start gap-2 self-stretch">
          <div className="flex gap-2">
            <div className="text-slate-500 text-m font-normal leading-[150%]">
              99
            </div>
            <div className="text-slate-500 text-m font-normal leading-[150%]">
              tương tác
            </div>
          </div>
          <div className="text-slate-500 text-m font-normal leading-[150%]">
            ·
          </div>
          <div className="flex gap-2">
            <div className="text-slate-500 text-m font-normal leading-[150%]">
              99
            </div>
            <div className="text-slate-500 text-m font-normal leading-[150%]">
              thảo luận
            </div>
          </div>
        </div>
        {/* End label */}

        <div className="article-footer flex px-4 items-start self-stretch gap-2">
          <div className="like flex items-start gap-0">
            <Button className="flex p-2 flex-col gap-1 rounded-tl-full rounded-tr-0 rounded-br-0 rounded-bl-full bg-slate-50">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  className="mt-[3px]"
                >
                  <path
                    d="M16.8914 7.74743C16.8914 7.74743 15.8377 4.9257 16.7763 4.20685C17.4955 3.65599 18.3455 3.73333 18.8139 4.57909L20.3754 8.0137C20.5836 8.60349 21 9.94958 21 10.6157C20.653 12.6279 18.8556 16.6731 14.4418 16.7563C13.997 16.8058 13.6245 16.7687 13.1222 16.6527M12.9846 7.18086L8.61233 2.80937C8.09197 2.2892 9.34101 0.311646 10.4861 1.24835L13.574 4.38563M2.64406 7.82004C0.728655 8.06983 0.874392 9.58939 1.18669 9.90163L5.55881 14.1689C6.64143 15.7509 9.30634 17.1872 11.1801 16.979C15.5939 16.8957 17.3913 12.8505 17.7383 10.8383C17.7383 10.1722 17.3219 8.82614 17.1137 8.23636L15.5522 4.80175C15.0838 3.95599 14.2338 3.87865 13.5145 4.42951C12.8138 4.96621 13.2508 6.64942 13.5173 7.46794C13.5509 7.57121 13.4149 7.66036 13.3381 7.58357L7.22438 1.47101C6.07937 0.534363 4.83051 2.5117 5.35061 3.03203M2.64406 7.82004L5.9752 11.1506M2.64406 7.82004L1.29079 6.36293C0.770295 5.73846 1.49898 4.38543 2.95635 4.38543M2.95635 4.38543L7.84897 9.27715M2.95635 4.38543L2.33177 3.76096C1.71089 3.13988 2.67705 1.61241 3.68504 1.68904C3.86008 1.70235 4.03637 1.76403 4.20584 1.88722L5.35061 3.03203M5.35061 3.03203L9.7229 7.40352"
                    stroke="#334155"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <div className="text-slate-500 text-m font-normal leading-6">
                  Vỗ tay
                </div>
              </div>
            </Button>
            <div className="flex w-[1px] py-4 flex-col items-start self-stretch rounded-full bg-slate-100"></div>
            <Button className="flex p-2 flex-col gap-1 rounded-tl-0 rounded-tr-full rounded-br-full rounded-bl-0 bg-slate-50">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                >
                  <path
                    d="M7.19656 3.21757C7.19656 0.348895 11.1331 0.199832 11.1331 3.14272M11.1331 3.14272C11.1331 4.00789 11.1331 4.35814 11.1331 4.35814M11.1331 3.14272C11.7141 0.972812 14.7469 1.25526 14.9595 3.14272C14.9742 3.26076 14.9965 3.5219 15.0145 3.91619M15.0446 4.35814C15.0446 3.76713 15.0314 4.28379 15.0145 3.91619M15.0145 3.91619C16.2492 2.42963 18.1483 2.80127 18.6585 3.91619C19.1687 5.0311 18.9561 8.0934 18.9561 10.5016C18.9561 12.679 15.8743 12.7783 15.2102 11.0962M15.0871 8.01907V10.5016C15.0966 10.7196 15.1398 10.9179 15.2102 11.0962M15.2102 11.0962C14.1942 13.6085 12.2102 13.341 11.2039 11.6315M11.2039 11.6315V8.01914M11.2039 11.6315C11.2039 12.3373 10.6155 12.9225 9.87176 13.1418M7.23571 4.32841V3.66333C7.23571 0.987684 3.35255 1.07687 3.35255 3.66333C3.35255 3.66333 3.35255 3.7872 3.35255 4.00545M7.22154 8.01914V11.0071C7.22154 11.2361 7.19472 11.444 7.14554 11.6315M7.14554 11.6315C6.60409 13.6951 3.35254 13.2693 3.35255 11.0071C3.35256 8.93274 3.35255 5.15651 3.35255 4.00545M7.14554 11.6315C7.69159 13.0976 8.91123 13.4249 9.87176 13.1418M3.35255 4.00545C2.68647 4.08473 1.28344 4.65359 1 6.29474L1 12.5977C1 13.4451 1.56689 15.7789 3.35255 15.9722C3.93056 16.0348 8.6813 15.9722 8.6813 15.9722C8.79468 15.9722 10.2261 15.7343 9.87176 13.1418M12.7199 16C12.7199 16 14.0209 16 15.4195 16C15.92 16 16.9685 16 17.5 14.6796"
                    stroke="#334155"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </Button>
          </div>
          {/* End like */}

          <div className="comment flex fle-col items-start">
            <Button className="flex py-2 px-4 flex-col gap-1 rounded-full bg-slate-50">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M5.5 8.5H5.51M10 8.5H10.01M14.5 8.5H14.51M5 16L5 18.3355C5 18.8684 5 19.1348 5.10923 19.2716C5.20422 19.3906 5.34827 19.4599 5.50054 19.4597C5.67563 19.4595 5.88367 19.2931 6.29976 18.9602L8.68521 17.0518C9.17252 16.662 9.41617 16.4671 9.68749 16.3285C9.9282 16.2055 10.1844 16.1156 10.4492 16.0613C10.7477 16 11.0597 16 11.6837 16L14.2 16C15.8802 16 16.7202 16 17.362 15.673C17.9265 15.3854 18.3854 14.9265 18.673 14.362C19 13.7202 19 12.8802 19 11.2L19 5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1L5.8 1C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8L1 12C1 12.93 1 13.395 1.10222 13.7765C1.37962 14.8117 2.18827 15.6204 3.22354 15.8978C3.60504 16 4.07003 16 5 16ZM6 8.5C6 8.77614 5.77614 9 5.5 9C5.22386 9 5 8.77614 5 8.5C5 8.22386 5.22386 8 5.5 8C5.77614 8 6 8.22386 6 8.5ZM10.5 8.5C10.5 8.77614 10.2761 9 10 9C9.72386 9 9.5 8.77614 9.5 8.5C9.5 8.22386 9.72386 8 10 8C10.2761 8 10.5 8.22386 10.5 8.5ZM15 8.5C15 8.77614 14.7761 9 14.5 9C14.2239 9 14 8.77614 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5Z"
                    stroke="#334155"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-slate-500 text-m font-normal leading-6 hidden sm:block">
                  Thảo luận
                </div>
              </div>
            </Button>
          </div>
          {/* End comment */}

          <div className="share flex fle-col items-start">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex py-2 px-4 flex-col gap-1 rounded-full bg-slate-50">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                    >
                      <path
                        d="M5.96889 11.359L12.04 14.941M12.0311 5.059L5.96889 8.641M17 3.7C17 5.19117 15.8061 6.4 14.3333 6.4C12.8606 6.4 11.6667 5.19117 11.6667 3.7C11.6667 2.20883 12.8606 1 14.3333 1C15.8061 1 17 2.20883 17 3.7ZM6.33333 10C6.33333 11.4912 5.13943 12.7 3.66667 12.7C2.19391 12.7 1 11.4912 1 10C1 8.50883 2.19391 7.3 3.66667 7.3C5.13943 7.3 6.33333 8.50883 6.33333 10ZM17 16.3C17 17.7912 15.8061 19 14.3333 19C12.8606 19 11.6667 17.7912 11.6667 16.3C11.6667 14.8088 12.8606 13.6 14.3333 13.6C15.8061 13.6 17 14.8088 17 16.3Z"
                        stroke="#334155"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-slate-500 text-m font-normal leading-6 hidden sm:block">
                      Chia sẻ
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div onClick={handleCopyUrl}>
                  <DropdownMenuItem className="cursor-pointer">
                    Sao chép liên kết
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* End share */}
        </div>
        {/* End article footer */}
        {/* <Button className="bg-slate-700 p-4 text-white">
          <LottieAnimate />
        </Button> */}
      </div>
    </>

  );
}
