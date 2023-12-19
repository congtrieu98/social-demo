"use client";

import { useState } from "react";
import { Button } from "../ui/button";

import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function HomeComponent() {
  const [readmore, setReadmore] = useState(true);
  const listSlide = [
    {
      id: 1,
      name: "slide 1",
    },
    {
      id: 2,
      name: "slide 2",
    },
    {
      id: 3,
      name: "slide 3",
    },
    {
      id: 4,
      name: "slide 4",
    },
    {
      id: 5,
      name: "slide 5",
    },
  ];
  console.log("1");
  return (
    <div className="article flex max-w-full flex-col py-4 items-start gap-2.5 rounded-[20px] bg-white">
      <div className="article-header flex px-4 justify-between items-start self-stretch">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex w-10 h-10 flex-col items-start">
            <div className="flex rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px] rounded-bl-[4px] bg-slate-100 flex-col justify-center items-center gap-2.5 p-2">
              {/* <img 
                  src="/assets/image/avarta-post.jpg"
                  alt=""
                  className="w-10 h-10"
               
                  /> */}
              <div className="text-slate-900 text-m font-normal leading-6">
                AB
              </div>
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
      </div>
      {/* End  article-header*/}

      <div className="paragraph flex px-4 items-start flex-col self-stretch">
        <div
          className={`${
            readmore ? "suzu_truncate-2" : ""
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

      <div>
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-fillter-aboutus lg:h-full h-[248px]"
        >
          {listSlide.map((slide, id) => (
            <SwiperSlide key={id}>
              <div className="w-full">{slide?.name}</div>
            </SwiperSlide>
          ))}
        </Swiper>
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

      <div className="flex px-4 items-start gap-2">
        <div className="flex">
          <div className="flex flex-col items-start">
            <Button className="flex p-2 flex-col gap-1 rounded-t-full rounded-bottom-0 bg-slate-50">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                ></svg>
              </div>
            </Button>
            <div className="divide-x divide-grey-100 rounded-full"></div>
            <Button className="flex p-2 flex-col gap-1 rounded-t-full rounded-bottom-0 bg-slate-50">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                ></svg>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {/* End article footer */}
    </div>
  );
}
