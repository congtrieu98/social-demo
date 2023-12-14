"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TypeFormModal } from "@/lib/constant/TypeFormModal";

const formSchema = z.object({
    email: z.string().email({
        message: "Hãy nhập địa chỉ email chính xác dinh dạng admin@example.com",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
});

export default function LoginForm({ setTypeFormModal }: any) {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl onChange={(e: any) => setEmail(e?.target?.value)}>
                                    <Input placeholder="Nhập email" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl onChange={(e: any) => setPassword(e?.target?.value)}>
                                <Input placeholder="Nhập mật khẩu" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex p-2 mb-2.5 flex-col items-start gap-1">
                    <div
                        onClick={() => setTypeFormModal(TypeFormModal.forgotPassword)}
                        className="text-slate-900 text-[15px] font-semibold leading-6 cursor-pointer">
                        Quên mật khẩu
                    </div>
                </div>

                <Button
                    className={`flex p-2 flex-col items-start gap-1 self-stretch rounded-full border border-slate-100 w-full ${email && password ? "bg-slate-900" : "bg-slate-50"
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
                            className={`flex-1 ${email && password ? "text-white" : "text-slate-900"
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
            </form>
        </Form>
    );
}
