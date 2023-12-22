'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export default async function FooterArticle() {
  const { toast } = useToast();

  const handleCopyUrl = async () => {
    // Lấy URL hiện tại của trang
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Success",
      description: "!URL đã được sao chép!",
      variant: "default",
    });
  };
  return (
    <>
      <div className="label flex items-start gap-2 self-stretch">
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

      <div className="article-footer flex items-start self-stretch gap-2">
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
          <Button className="flex py-2 flex-col gap-1 rounded-full bg-slate-50">
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
              <Button className="flex py-2 flex-col gap-1 rounded-full bg-slate-50">
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
    </>
  );
}
