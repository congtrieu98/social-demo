/* eslint-disable @next/next/no-async-client-component */
"use client";

import { ForgotForm } from "@/components/general/form/ForgotForm";
import { LoginFormModal } from "@/components/general/form/LoginFormModal";
import { SignupFormModal } from "@/components/general/form/SignupFormMoadal";

import { Dialog, DialogContent } from "@/components/ui/dialogCommon";
import { TypeFormModal } from "@/lib/constant/TypeFormModal";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignnIn() {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [typeFormModal, setTypeFormModal] = useState<TypeFormModal>(1);

    const handleChangeModal = () => {
        setOpen(!open)
        setTypeFormModal(0)
        router.push('/')
    }
    return (
        <>
            <Dialog onOpenChange={handleChangeModal} open={open}>
                <DialogContent>
                    <div className="">
                        {
                            typeFormModal == 0 ?
                                <LoginFormModal setTypeFormModal={setTypeFormModal} /> :
                                typeFormModal == 1 ?
                                    <SignupFormModal setTypeFormModal={setTypeFormModal} /> :
                                    typeFormModal === 2 ?
                                        <ForgotForm setTypeFormModal={setTypeFormModal} /> :
                                        ''
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}