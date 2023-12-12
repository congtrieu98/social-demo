"use client";

import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <form>
      <div className="mb-2.5">
        <Input
          type="text"
          placeholder="Nhập email"
          className="placeholder:text-slate-500 placeholder:text-[15px] placeholder:font-normal placeholder:leading-5"
        />
      </div>
      <div className="">
        <Input
          type="text"
          placeholder="Nhâp mật khẩu"
          className="placeholder:text-slate-500 placeholder:text-[15px] placeholder:font-normal placeholder:leading-5"
        />
      </div>
      <button className="flex p-2 mb-2.5 flex-col items-start gap-1">
        <div className="text-slate-900 text-[15px] font-semibold leading-6">
          Quên mật khẩu
        </div>
      </button>
      <button className="flex p-2 flex-col items-start gap-1 self-stretch rounded-full border border-slate-100 w-full bg-slate-50" disabled>
        <div className="flex gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
          </svg>
          <div className="flex-1 text-slate-900 text-center text-[15px] font-semibold leading-6">
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
      </button>
    </form>
  );
}
