'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ISlide {
    id: number
    name: string
    image: string
  }

  
export default async function ContentArticle() {
    const [readmore, setReadmore] = useState(true);
    const [open, setOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<ISlide>();

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
    return (
        <>
        <div className="paragraph flex items-start flex-col self-stretch">
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
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/z9bMKvYxX8I?si=Hhm-7oA3YQW22bTj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
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
        </>
    )
}