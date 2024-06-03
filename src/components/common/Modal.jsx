/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoIosClose } from "react-icons/io";

export default function Modal({ close, isOpen, title, content }) {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => {
            close();
          }}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white px-6 py-10 backdrop-blur-2xl relative border">
                  <span
                    className="text-white text-lg bg-purple-600 rounded p-1 cursor-pointer absolute top-2 right-2"
                    onClick={close}
                  >
                    <IoIosClose />
                  </span>
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white text-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-xl px-2 py-1"
                  >
                    {title}
                  </DialogTitle>
                  {content}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
