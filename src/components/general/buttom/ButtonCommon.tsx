"use client";

import { Button } from "@/components/ui/button";

interface Bprops {
  email?: string;
  password?: string;
  content?: string;
  disable?: Boolean;
  className?: string;
}
export function ButtonCommon({
  email,
  password,
  content,
  disable,
  className,
}: Bprops) {
  return (
    <Button
      className={`flex p-2 flex-col items-start gap-1 self-stretch rounded-full border border-slate-100 w-full ${
        email && password ? "bg-slate-900" : "bg-slate-50"
      }`}
      type="submit"
      disabled={email && password ? false : true}
    >
      <div className="flex gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        ></svg>
        <div
          className={`flex-1 ${
            email && password ? "text-white" : "text-slate-900"
          } text-center text-[15px] font-semibold leading-6`}
        >
          SuZu thuiii
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
  );
}
