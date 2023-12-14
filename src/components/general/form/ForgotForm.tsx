"use client";

import React from "react";
import ForgotPass from "@/components/auth/forgotPass/ForgotPass";
import { TypeFormModal } from "@/lib/constant/TypeFormModal";

export const ForgotForm =
    ({ setTypeFormModal }: any) => {
        return (
            <>
                <div className="flex flex-col transform rounded-2xl pt-8 items-center justify-center gap-5 transition-all">
                    <button className="absolute -top-12 flex p-2 flex-col items-start gap-1 self-stretch rounded-full w-full">
                        <div className="flex gap-2 w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                            ></svg>
                            <div className="flex-1 text-white text-center text-[15px] font-semibold leading-6">
                                Quên mật khẩu
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
                    <div className="flex flex-col gap-5">
                        <div className="text-left flex flex-col gap-2.5">
                            <div className="text-[23px] font-semibold leading-7 text-slate-700 ">
                                Quên mật khẩu rồi 🤧!
                            </div>

                            <div className="text-xs font-normal text-slate-500">
                                <div className="text-xs font-normal text-slate-500">
                                    Hãy nhập địa chỉ email của bạn bên dưới.
                                    <br />
                                    Email đã đăng ký trên SuZu, để tạo mật khẩu mới.
                                </div>
                            </div>

                            <div className="flex flex-col  gap-2.5">
                                <div className="w-full">
                                    <ForgotPass />
                                </div>
                            </div>
                        </div>

                        <div className="flex px-4 pt-3 pb-6 justify-center items-center border-t border-slate-100 w-full">
                            <div className="flex text-slate-500 text-center">
                                Bạn đã có tài khoản 😉?
                                <button
                                    onClick={() => setTypeFormModal(TypeFormModal.login)}
                                    className="text-slate-900 text-[15px] font-semibold leading-6 ml-2"
                                >
                                    Đăng nhập nào
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
