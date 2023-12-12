'use client';
import React, { PropsWithChildren, useState } from 'react';
import { Fragment } from "react";
import {Transition, Dialog} from '@headlessui/react'
// interface IModalProps {
//   isOpen: boolean
//   onClose: () => void
//   children: React.ReactNode
//   dialogBg?: string
// }

export const Modal: React.FunctionComponent<
  PropsWithChildren
> = () => {

  console.log("File modal")
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-200"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className=" inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. Weve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>


    // <>
    //   <Transition appear show={isOpen} as={Fragment}>
    //     <Dialog as="div" className="relative z-50" onClose={onClose}>
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <div className="fixed inset-0 bg-black bg-opacity-80" />
    //       </Transition.Child>

    //       <div className={`fixed inset-0 overflow-y-auto ${top ? top : 'top-[50%]'}`}>
    //         <div className={`flex min-h-full min-w-full justify-center text-center items-end`}>
    //           <Transition.Child
    //             as={Fragment}
    //             enter="ease-out duration-300"
    //             enterTo="opacity-100 scale-100"
    //             leave="ease-in duration-200"
    //             leaveFrom="opacity-100 scale-100"
    //             leaveTo="translate-y-[100%]"
    //           >
    //             <Dialog.Panel className={`w-full transform overflow-hidden rounded-tr-2xl rounded-tl-2xl text-left ${dialogBg ? dialogBg : 'bg-white'}`}>
    //               <Dialog.Title
    //                 as="div"
    //                 className="flex py-1.5 px-1 items-center justify-center'"
    //               >
    //                 <div className="mx-auto bg-grey-700 w-[82px] h-1 rounded-full" />
    //               </Dialog.Title>
    //               {children}
    //             </Dialog.Panel>
    //           </Transition.Child>
    //         </div>
    //       </div>
    //     </Dialog>
    //   </Transition>
    // </>
  );
}
