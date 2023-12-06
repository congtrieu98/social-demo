"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { Media } from "@/lib/db/schema/medias";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function FeedImagesModal({ medias }: { medias?: Media[] }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {
            <div className="flex space-x-4">
              <Image
                // @ts-ignore
                src={medias[0].url}
                // @ts-ignore
                alt={medias[0].url}
                width={100}
                height={100}
                className="h-[100px] w-[100px] object-contain rounded-md"
              />
              {
              // @ts-ignore
              medias.length > 1 && <div className="h-[90px] w-[90px] border rounded-sm bg-gray-300 opacity-20  hover:shadow-g">
                <div className="flex justify-center items-center mt-7">
                  <div className="text-2xl text-gray-600">+</div>
                  <div className="text-xl text-gray-4600">
                    {
                      // @ts-ignore
                      medias.length - 1
                    }
                  </div>
                </div>
              </div>}
            </div>
          }
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="px-5 pb-5">
          {
            // @ts-ignore
          medias.length > 1 ? (
            <Carousel showThumbs={false}>
              {medias?.map((item) => (
                <Image
                  src={item.url}
                  alt={item.url}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain rounded-md"
                />
              ))}
            </Carousel>
          ) : (
            <Image
              // @ts-ignore
              src={medias[0].url}
              // @ts-ignore
              alt={medias[0].url}
              width={100}
              height={100}
              className="h-full w-full object-contain rounded-md"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
