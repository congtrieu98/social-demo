/* eslint-disable @next/next/no-async-client-component */
"use client";

import { ForgotForm } from "@/components/general/form/ForgotForm";
import { LoginFormModal } from "@/components/general/form/LoginFormModal";
import { SignupFormModal } from "@/components/general/form/SignupFormMoadal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TypeFormModal } from "@/lib/constant/TypeFormModal";
import { useState } from "react";


export default function SignnIn() {
    const [open, setOpen] = useState(true);
    const [typeFormModal, setTypeFormModal] = useState<TypeFormModal>(0);

    const handleChangeModal = () => {
        setOpen(!open)
        setTypeFormModal(0)
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