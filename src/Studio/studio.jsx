import { TestimonialLayout } from "../Testimonial/Testimonials";
import { useEffect, useState } from "react";
import { NavigationTab } from "./Components/Tabs";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AddManually } from "./AddTestimonialModal";
import axios from "axios";
import { Api } from "../Apis/api";
import avatarImage1 from "../images/avatars/avatar-1.png";
import avatarImage2 from "../images/avatars/avatar-2.png";
import avatarImage3 from "../images/avatars/avatar-3.png";
import avatarImage4 from "../images/avatars/avatar-4.png";
import avatarImage5 from "../images/avatars/avatar-5.png";
import { useParams } from "react-router-dom";
import { createContext } from "react";
import {
  AlphaPicker,
  BlockPicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from "react-color";
import { getUpdatedGoogleReviews } from "../services/googleMaps";
import { StudioHeader } from "./Components/StudioHeader";
import { CustomizationBar } from "./Components/CustomizationBar";
import { getTestimonialData } from "../services/common";

export const testimonialsdata = [
  {
    content:
      "The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.",
    author: {
      name: "Leland Kiehn",
      role: "Founder of Kiehn and Sons",
      image: avatarImage5,
    },
    rating: 4,
  },
  {
    content:
      "There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.",
    author: {
      name: "Erin Powlowski",
      role: "COO at Armstrong Inc",
      image: avatarImage2,
    },
    rating: 4,
  },
  {
    content:
      "TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.",
    author: {
      name: "Sheryl Berge",
      role: "CEO at Lynch LLC",
      image: avatarImage1,
    },
    rating: 5,
  },
  {
    content:
      "I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.",
    author: {
      name: "Amy Hahn",
      role: "Director at Velocity Industries",
      image: avatarImage4,
    },
    rating: 4,
  },
  {
    content:
      "I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.",
    author: {
      name: "Peter Renolds",
      role: "Founder of West Inc",
      image: avatarImage3,
    },
    rating: 4,
  },
  {
    content:
      "This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.",
    author: {
      name: "Amy Hahn",
      role: "Director at Velocity Industries",
      image: avatarImage4,
    },
    rating: 4,
  },
];

export const ThemeContext = createContext();

const testTheme = {
  bgcolor: "#fff",
  cardBgColor: "#fff",
  textColor: "#000",
  sepColor: "#F1F5F9",
};

export function Studio() {
  const { id } = useParams();
  const [testimonialsData, setTestimonialData] = useState([]);
  const [state, setState] = useState("pending");
  const [themes, setThemes] = useState(testTheme);


  useEffect(() => {
    //get Testimonial data from Api
    const userId = localStorage.getItem("id");
    getTestimonialData(id)
    .then((data)=>setTestimonialData(data))
  }, []);
  return (
    <div>
      <ThemeContext.Provider value={[themes, setThemes]}>
        
        {/* Studio head has the Testimonial Name,import from like Google, Twitter and Search bar */}
        <StudioHeader setTestimonialData={setTestimonialData} id={id} setState={setState} />
        
        {/* Navigation Bar has the Type of state like Accepted, Pending.. */}
        <NavigationTab state={state} setState={setState} />
        {/* <StudioNavigationBar state={state} setState={setState} /> */}

        {/* Type of Layouts like Masonry, Grid,Curosal */}
        <div className="">
          <TestimonialLayout
            state={state}
            setTestimonialData={setTestimonialData}
            testimonialsData={testimonialsData}
          />

          {/* This can make the Customizations in the Testimonial Grids */}
          <CustomizationBar
            setThemes={setThemes}
            themes={themes}
            state={state}
            setState={setState}
          />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */

export default function Example({ state, setState }) {
  const [open, setOpen] = useState(state);

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
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Panel title
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        />
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
  );
}
