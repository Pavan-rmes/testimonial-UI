import { Testimonials } from "../Testimonial/Testimonials";
import { useState } from "react";
import {NavigationTab} from "./Tabs"
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


export function Studio() {
  const [state, setState] = useState("pending");
  return (
    <div>
        <NavigationTab state={state} setState={setState} />
      {/* <StudioNavigationBar state={state} setState={setState} /> */}
      <div className="relative">
        <Testimonials state={state} />
        <CustomizationBar state={state} setState={setState} />
      </div>
    </div>
  );
}

function StudioNavigationBar({ state, setState }) {
  return (
    <ul className="mx-4 my-10 flex border-b-2 border-blue-600 mb-4">
      <li
        onClick={() => {
          setState("pending");
        }}
        className={`px-3 py-2 cursor-pointer rounded-t ${
          state === "pending" && "bg-blue-600 text-white"
        }`}
      >
        <a>Pending</a>
      </li>
      <li
        onClick={() => {
          setState("accepted");
        }}
        className={`px-3 cursor-pointer rounded-t py-2 ${
          (state === "accepted" || state === "customize") &&
          "bg-blue-600 text-white"
        }`}
      >
        <a>Accepted</a>
      </li>
      <li
        onClick={() => {
          setState("insights");
        }}
        className={`px-3 cursor-pointer rounded-t py-2 ${
          state === "insights" && "bg-blue-600 text-white"
        }`}
      >
        <a>Insights</a>
      </li>
      <li
        onClick={() => {(state === "customize") ?setState("accepted"):setState("customize")}}
        className={`px-3 cursor-pointer rounded-t py-2  ${
          state === "accepted" || state === "customize" ? "block" : "hidden"
        }`}
      >
        <a>Customize</a>
      </li>
    </ul>
  );
}

export function CustomizationBar({ state,setState }) {
  
  const style = (state !=="customize")?{display:"none"}:{}

  return (
    <div
    style={style}
      className={`fixed h-screen lg:w-5/12 w-1/2 bg-gray-50 right-0 top-0 ${
        state === "customize"
          ? "right-0 animate-slide-in-right"
          : "-right-4 animate-slide-out-right"
      } `}
      // style={style}
    >
      <div className="relative pt-2">
        <div
        onClick={()=>{(setState("accepted"))}}
        className="absolute border border-black rounded border-1 -left-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}


/* This example requires Tailwind CSS v2.0+ */


export default function Example({state,setState}) {
  const [open, setOpen] = useState(state)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Panel title</Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

