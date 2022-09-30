/* This example requires Tailwind CSS v2.0+ */
/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { ArrowRightIcon} from "@heroicons/react/24/outline";
import {Modal} from "./Modal"
import { useNavigate } from "react-router-dom";

const people = [
  {
    CampaignName: "Test1",
    Accepted: "10",
    Pending: "20",
    Views: "500",
    Status: "ON",
  },
  // More people...
];

export function TableContent({testimonials}) {
  const testimonialsData = testimonials[1].testimonials;
  console.log(testimonialsData)
  let navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
          onClick={()=>navigate("/studio")}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 focus:outline-none focus:ring-2 focus:ring-eeorange-500 focus:ring-offset-2 sm:w-auto"
          >
            + Create Campaign
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Campaign Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Accepted
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Pending
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Views
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white ">
            {testimonialsData.map((testimonial,id) => (
              <tr key={id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none sm:pl-6">
                  <span className='cursor-pointer hover:text-gray-900'>{testimonial.testimonial}</span>
                  <dl className="font-normal lg:hidden">
                    {/* <dt className="sr-only">Title</dt> */}
                    <dd className="mt-1 truncate text-gray-700">
                      {" "}
                      Accepted :{testimonial?.accepted}
                    </dd>
                    {/* <dt className="sr-only sm:hidden">Email</dt> */}
                    <dd className="mt-1 truncate text-gray-700 sm:hidden">
                      Pending: {testimonial?.pending}
                    </dd>
                    <dd className="mt-1 truncate text-gray-700 sm:hidden">
                      Views: {testimonial?.views}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {testimonial?.accepted}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {testimonial?.pending}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {testimonial?.views}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 w-36">
                    <ToggleButton toggleStatus={testimonial?.status} />
                </td>
                <td className="py-4 pl-3 pr-4 flex flex-row  justify-center text-right text-sm font-medium text-eeorange-500 hover:text-eeorange-700">
                  <a href="#">View</a>
                  <ArrowRightIcon className='w-6 h-6' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function ToggleButton({toggleStatus}) {
  const [enabled, setEnabled] = useState(+{toggleStatus})
  const [open, setOpen] = useState(false)

  function changeToggle(){
    enabled ? setOpen(true) :setEnabled(true)
  }

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={()=>changeToggle()}
        className={classNames(
          enabled ? 'bg-green-500' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Modal open={open} setOpen={setOpen} setEnabled={setEnabled} />
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">{enabled?"Active":"Inactive"}</span>
      </Switch.Label>
    </Switch.Group>
  )
}

