import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SideNavbar } from "../Navbar/SideNavbar";
import { Testimonials } from "./TestimonialTable";
import { navigation, classNames } from "../Navbar/SideNavbar";
import { Navigate, useNavigate } from "react-router-dom";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { Studio } from "../Studio/studio";
import { AuthRoute } from "../Auth/AuthRoute";
import { FirstTestimonialForm } from "../Form/FirstTestimonial";
import { useEffect } from "react";
import axios from "axios";
import { Api } from "../Apis/api";

export default function AppScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navData, setNavData] = useState(navigation);

  useEffect(() => {
    let id = window.localStorage.getItem("id");
    axios
      .get(`${Api}/testimonial/all?userId=${id}`)
      .then((res) => res.data)
      .then((res) => {
        let navdata = [...navData];
        navdata[1].testimonialwalls = res;
        console.log(navdata)
        setNavData(navdata);
      });
  }, []);

  return (
    <>
      <div>
        <Transitionroot
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <SideNavbar navData={navData} setNavData={setNavData} />
        <div className="md:pl-64">
          <AuthRoute
            path="/home"
            element={<HomeScreen testimonials={navData} />}
          />
          <AuthRoute
            path="/testimonials"
            element={<Testimonials testimonials={navData} />}
          />
          <AuthRoute path="/studio/:id" element={<Studio />} />
          <AuthRoute path="/my-account" element={<>my Account</>} />
          <AuthRoute path="/upgrade" element={<>Upgrade</>} />
          <AuthRoute path="/" element={<Navigate to="/home" replace />} />
        </div>
      </div>
    </>
  );
}

function HomeScreen(params) {
  const navigate = useNavigate();
  return (
    <div className="px-4 mt-10 mx-5 lg:mt-20 lg:mx-20 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Shoutout Walls
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All your live and draft walls.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => navigate("/studio")}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 focus:outline-none focus:ring-2 focus:ring-eeorange-500 focus:ring-offset-2 sm:w-auto"
          >
            + Create Campaign
          </button>
        </div>
      </div>
      <hr className="my-4"></hr>
      <div>
        <div>
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <p className="no-underline text-black" >
                    Number of testimonials
                  </p>
                </h1>
                <p className="text-grey-darker text-sm">1</p>
              </div>
            </div>
          </div>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <p className="no-underline text-black" href="#">
                    Number of widgets
                  </p>
                </h1>
                <p className="text-grey-darker text-sm">0</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Transitionroot({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
