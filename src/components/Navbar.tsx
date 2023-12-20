import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "./ui/button";

export default async function Navbar() {
  const { session } = await getUserAuth();
  const nameExists = !!session?.user.name && session?.user.name.length > 5;

  if (session?.user) {
    return (
      <div className="py-4 flex items-center justify-center self-stretch">
        <div className="flex justify-between items-center">
          <Link
          href="/"
          className="logo w-10 h-10 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
            >
              <path
                d="M14.6235 10.497C11.9966 12.4142 10.2548 15.1169 11.3319 17.3691C12.2647 19.3116 14.1508 18.8912 14.1508 18.8912C8.83331 21.8333 2.84036 22.2656 1.6538 18.5751C0.467228 14.8846 2.35178 6.28648 11.0972 2.15498C14.9805 0.32315 20.155 0.50333 20.7261 3.90937C21.3051 7.36757 16.3717 9.21836 14.6235 10.497Z"
                stroke="#0F172A"
                stroke-width="2"
              />
              <path
                d="M25.1889 5.71262C21.6594 6.66094 22.1511 14.3423 14.5923 18.6492C8.83557 21.9304 2.84563 22.2655 1.65589 18.575C5.75494 31.3583 17.5381 26.2374 21.1375 23.2328C26.6404 18.6382 25.8695 11.6712 27.6842 11.3361C28.0475 11.2555 30.2065 10.8952 32.072 13.1127C34.8243 16.3828 34.1342 21.3314 34.0819 21.6554C34.8369 18.978 34.8322 16.1694 34.2405 13.8871C32.9064 8.70298 28.7185 4.76114 25.1889 5.71262Z"
                stroke="#0F172A"
                stroke-width="2"
              />
              <path
                d="M27.6335 11.3489C27.6335 11.3489 30.0304 10.6835 32.0752 13.1127C34.8275 16.3828 34.1326 21.3362 34.0851 21.6555C33.0651 25.267 30.6618 28.6398 26.4215 30.154C20.5756 32.2413 14.6756 30.217 10.908 26.8041C16.4902 26.8746 20.6568 23.8746 22.172 22.3261C23.7164 22.8327 25.3629 22.6714 26.8578 21.9131C32.4813 19.0603 30.4413 12.882 28.7963 11.7235C28.3061 11.3789 27.9333 11.2698 27.6335 11.3489Z"
                stroke="#0F172A"
                stroke-width="2"
              />
            </svg>
          </Link>
          {/* end logo */}

          <div className="nav-bar flex justify-center items-center gap-1">
            <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5228 0.336112C10.1805 0.243432 9.81975 0.243432 9.47745 0.336112C9.08008 0.443702 8.74553 0.706359 8.47852 0.91599L8.40389 0.974402L1.62159 6.24953L1.54389 6.30987C1.16725 6.60216 0.835439 6.85966 0.58818 7.19396C0.371188 7.48735 0.209542 7.81785 0.11118 8.16926C-0.000900149 8.56967 -0.000446317 8.98968 6.89057e-05 9.46642L0.000139478 9.56481L0.000138524 16.8383C0.000120643 17.3654 0.000105144 17.8202 0.030709 18.1948C0.0630099 18.5901 0.134326 18.9833 0.32712 19.3617C0.61474 19.9262 1.07368 20.3851 1.63817 20.6728C2.01655 20.8656 2.40977 20.9369 2.80511 20.9692C3.17968 20.9998 3.63443 20.9998 4.16157 20.9997L15.8387 20.9997C16.3658 20.9998 16.8206 20.9998 17.1952 20.9692C17.5905 20.9369 17.9837 20.8656 18.3621 20.6728C18.9266 20.3851 19.3855 19.9262 19.6732 19.3617C19.866 18.9833 19.9373 18.5901 19.9696 18.1948C20.0002 17.8202 20.0002 17.3654 20.0001 16.8383V9.56481L20.0002 9.46643C20.0007 8.98969 20.0012 8.56967 19.8891 8.16926C19.7907 7.81786 19.6291 7.48735 19.4121 7.19396C19.1648 6.85967 18.833 6.60217 18.4564 6.30989L18.3787 6.24953L11.5964 0.974403L11.5218 0.915992C11.2548 0.70636 10.9202 0.443702 10.5228 0.336112ZM6 14.9998C5.44772 14.9998 5 15.4475 5 15.9998C5 16.552 5.44772 16.9998 6 16.9998L14 16.9998C14.5523 16.9998 15 16.552 15 15.9998C15 15.4475 14.5523 14.9998 14 14.9998L6 14.9998Z"
                  fill="#0F172A"
                />
              </svg>
            </Link>

            <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z"
                  stroke="#334155"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>

            <Link href="/" className="flex justify-center items-center gap-1">
              <div className="flex w-10 h-10 p-[6px] flex-col justify-center items-center gap-1 flex-shrink-0 rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] border border-solid border-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 1.66666L11 20.3333M1.66667 11L20.3333 11"
                    stroke="#0F172A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </Link>

            <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path
                  d="M7.48854 19.55C8.15842 20.1412 9.03835 20.5 10.0021 20.5C10.9658 20.5 11.8457 20.1412 12.5156 19.55M15.7021 7.2C15.7021 5.68827 15.1015 4.23845 14.0326 3.16949C12.9636 2.10053 11.5138 1.5 10.0021 1.5C8.49034 1.5 7.04053 2.10053 5.97157 3.16949C4.90261 4.23845 4.30208 5.68827 4.30208 7.2C4.30208 10.1357 3.56152 12.1457 2.73426 13.4751C2.03645 14.5966 1.68754 15.1573 1.70034 15.3137C1.7145 15.4869 1.75119 15.553 1.89076 15.6565C2.01681 15.75 2.58504 15.75 3.72149 15.75L16.2827 15.75C17.4191 15.75 17.9873 15.75 18.1134 15.6565C18.253 15.553 18.2897 15.4869 18.3038 15.3137C18.3166 15.1573 17.9677 14.5966 17.2699 13.4751C16.4426 12.1457 15.7021 10.1357 15.7021 7.2Z"
                  stroke="#334155"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>

            <Link href="/" className="home-button flex h-10 py-2 px-5 justify-center items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
              >
                <path
                  d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                  stroke="#334155"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>

            {/* <Button className=" h-10 flex p-2 rounded-full flex-col justify-center items-start gap-1 flex-cold bg-slate-100">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                >
                  <path
                    d="M1 7L19 7M1 1L19 1M7 13L19 13"
                    stroke="#0F172A"
                    stroke-width="2"
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
            </Button> */}
            <div className="space-x-2 flex items-center">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarFallback>
                        <Button className=" h-10 flex p-2 rounded-full flex-col justify-center items-start gap-1 flex-cold bg-slate-100">
                          <div className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="14"
                              viewBox="0 0 20 14"
                              fill="none"
                            >
                              <path
                                d="M1 7L19 7M1 1L19 1M7 13L19 13"
                                stroke="#0F172A"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </Button>
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                  <Link href="/posts">
                      <DropdownMenuItem className="cursor-pointer">
                      Tham gia vào SuZu!
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/posts">
                      <DropdownMenuItem className="cursor-pointer">
                      Tạo tài khoản
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/posts">
                      <DropdownMenuItem className="cursor-pointer">
                      Hỗ trợ
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/posts">
                      <DropdownMenuItem className="cursor-pointer">
                      Báo lỗi
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />



                    <Link href="/posts">
                      <DropdownMenuItem className="cursor-pointer">
                        Posts
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/feeds">
                      <DropdownMenuItem className="cursor-pointer">
                        Feeds
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/medias">
                      <DropdownMenuItem className="cursor-pointer">
                        Medias
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/users">
                      <DropdownMenuItem className="cursor-pointer">
                        Users
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/account">
                      <DropdownMenuItem className="cursor-pointer">
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/api/auth/signout">
                      <DropdownMenuItem className="cursor-pointer">
                        Sign out
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/sign-in">Sign in</Link>
              )}
            </div>
          </div>
          {/* End navbar */}
        </div>
      </div>
    );
  } else return null;
}

{
  /* <h1 className="font-semibold space-x-4 transition-hover cursor-pointer">
        <Link href="/" className="hover:opacity-75">Logo</Link>
        <Link href="/posts" className="hover:opacity-75">Posts</Link>
        <Link href="/feeds" className="hover:opacity-75">Feeds</Link>
        <Link href="/medias" className="hover:opacity-75">Medias</Link>
        <Link href="/users" className="hover:opacity-75">Users</Link>
        <Link href="/resend" className="hover:opacity-75">Resend</Link>
      </h1>
      <div className="space-x-2 flex items-center">
        <ModeToggle />
        {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {nameExists
                  ? session.user.name
                    ?.split(" ")
                    .map((word) => word[0].toUpperCase())
                    .join("")
                  : "~"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <span className="font-semibold">
                {nameExists ? session.user.name : "New User"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/posts">
              <DropdownMenuItem className="cursor-pointer">
                Posts
              </DropdownMenuItem>
            </Link>
            <Link href="/feeds">
              <DropdownMenuItem className="cursor-pointer">
                Feeds
              </DropdownMenuItem>
            </Link>
            <Link href="/medias">
              <DropdownMenuItem className="cursor-pointer">
                Medias
              </DropdownMenuItem>
            </Link>
            <Link href="/users">
              <DropdownMenuItem className="cursor-pointer">
                Users
              </DropdownMenuItem>
            </Link>
            <Link href="/account">
              <DropdownMenuItem className="cursor-pointer">
                Account
              </DropdownMenuItem>
            </Link>
            <Link href="/api/auth/signout">
              <DropdownMenuItem className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        ) 
          : (
            <Link href="/sign-in">Sign in</Link>
          )}

      </div> */
}
