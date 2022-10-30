import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StarRating } from './starRating'
import axios from 'axios';
import { Api } from '../Apis/api';


export function AddManually({open,setOpen}) {
    const cancelButtonRef = useRef(null)
    const [title,setTitle] = useState();
    const [name,setName] = useState();
    const [body,setBody] = useState();
    const [rating,setRating] = useState(5);

    function handleClick(){
      if(!title && !name && !body && ! rating){
        alert("Fill All details")
        return;
      }
      axios.post(`${Api}/testimonial/new-testimonial`,{name,title,body,rating})
      .then((res)=>{setOpen(false);})
      .catch((e)=>console.log(e))
    }
  
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div >
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Fill The Details
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-5">
                        <div>
                          <p className='text-gray-600 text-sm'>Title</p>
                         <input
                         onChange={(e)=>setTitle(e.target.value)}
                         className='lg:w-3/4 w-full border-2 px-2 rounded border-orange-400 focus:outline-none focus:border-orange-500  ' />
                        </div>
                        <div>
                          <p className='text-gray-600 text-sm'>Name</p>
                         <input
                         onChange={(e)=>setName(e.target.value)}
                         className='lg:w-3/4 w-full border-2 px-2 rounded border-orange-400 focus:outline-none focus:border-orange-500  ' />
                        </div>
                        <div>
                          <span className='text-gray-600 text-sm' >Rating</span>
                          <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <div>
                          <p className='text-gray-600 text-sm'>Review</p>
                          <textarea
                          onChange={(e)=>setBody(e.target.value)}
                          rows={4} cols="40" className=' resize py-1 border-2 px-2 rounded border-orange-400 focus:outline-none focus:border-orange-500  ' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-eeorange-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {handleClick()}}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }