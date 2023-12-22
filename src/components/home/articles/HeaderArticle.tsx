import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

export default async function ArticleHeader() {
    return (
        <div className="article-header flex justify-between items-start self-stretch">
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
    )
}