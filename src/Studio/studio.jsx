import { TestimonialLayout } from "../Testimonial/Testimonials";
import { useContext, useState } from "react";
import { NavigationTab } from "./Tabs";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
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
import { CrossSvg } from "../icons";
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker } from 'react-color'


export const testimonialsdata = [
    {
      content:
        "The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.",
      author: {
        name: "Leland Kiehn",
        role: "Founder of Kiehn and Sons",
        image: avatarImage5,
      },
      rating:4
    },
    {
      content:
        "There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.",
      author: {
        name: "Erin Powlowski",
        role: "COO at Armstrong Inc",
        image: avatarImage2,
      },
      rating:4
    },
    {
      content:
        "TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.",
        author: {
        name: "Sheryl Berge",
        role: "CEO at Lynch LLC",
        image: avatarImage1,
      },
      rating:5
    },
    {
      content:
        "I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.",
      author: {
        name: "Amy Hahn",
        role: "Director at Velocity Industries",
        image: avatarImage4,
      },
      rating:4
    },
    {
      content:
        "I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.",
      author: {
        name: "Peter Renolds",
        role: "Founder of West Inc",
        image: avatarImage3,
      },
      rating:4
    },
    {
      content:
        "This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.",
      author: {
        name: "Amy Hahn",
        role: "Director at Velocity Industries",
        image: avatarImage4,
      },
      rating:4
    }
];


export const ThemeContext = createContext();

const testTheme = {bgcolor:"#fff",cardBgColor:"#fff",textColor:"#000",sepColor:"#F1F5F9"}

export function Studio() {
  const { id } = useParams();
  const [testimonialsData,setTestimonialData] = useState([]);
  const [state, setState] = useState("pending");
  const [themes,setThemes] = useState(testTheme);

  useState(()=>{
   //get Testimonial data from Api
   const userId = localStorage.getItem("id");
   axios.get(`${Api}/testimonial/all-testimonials?userId=${userId}&id=${id}`)
    .then((data)=>setTestimonialData(data.data))
    .catch((e)=>console.log(e))

  },[])
  return (
    <div>
      <ThemeContext.Provider value = {[themes,setThemes]}>
        <StudioHeader setTestimonialData={setTestimonialData} id={id} />
        <NavigationTab state={state} setState={setState} />
        {/* <StudioNavigationBar state={state} setState={setState} /> */}
        <div className="relative">
          <TestimonialLayout state={state} testimonialsData={testimonialsData} />
          <CustomizationBar setThemes={setThemes} themes={themes} state={state} setState={setState} />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}



async function postNewTweet(twitterlink,id){
  let response;
  const userId = localStorage.getItem("id");
  if(!twitterlink){
    alert("invalid")
    return;
  }
  
  await axios.get(`${Api}/testimonial/getNewTweet?url=${twitterlink}&userId=${userId}&id=${id}`)
  .then((res)=>{response = (res?.data);console.log(res.data)})
  .catch((e)=>console.log(e))
  return response;
}



function StudioHeader({setTestimonialData,id}) {
  const [testimonialName, setTestimonialName] = useState("New Testimonial Wall");
  const [twitterlink,setTwitterlink] = useState("");
  const [openModel,setOpenModal] = useState(false);

  const ref = useRef(null);
  const handleEdit = () => {
    ref.current.focus();
  };

  const userId = localStorage.getItem("id");

  async function handleGetTweet(){
    const insertResp = await postNewTweet(twitterlink,id)
    if(insertResp.status){
      alert(insertResp.status)
    }
    if(insertResp){
      axios.get(`${Api}/testimonial/all-testimonials?userId=${userId}&id=${id}`)
      .then((data)=>setTestimonialData(data.data))
      .catch((e)=>console.log(e))
    }
    
  }

  

  return (
    <div className="mt-2 mx-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            value={testimonialName}
            onChange ={(e)=>setTestimonialName(e.target.value)}
            ref={ref}
            className="border border-gray-500 px-2 rounded focus:outline-none border-2 focus:border-orange-200 h-8"
          />
          <PencilSquareIcon
            onClick={handleEdit}
            className="text-gray-700 cursor-pointer w-5 h-5"
          />
        </div>
        <p className="border border-orange-200 cursor-pointer p-2 lg:mr-20 md:mr-10 mr-4 rounded border-2">
          &lt;&gt;Show Embed Code
        </p>
      </div>
      {/* <div className="mt-6">
        <button
          onClick={()=>setOpenModal(true)}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 sm:w-auto"
        >
          Add Testimonial
        </button>
      </div>
      <AddManually open={openModel} setOpen={setOpenModal} /> */}
      <div>
        <input
          value={twitterlink}
          onChange={(e)=>(setTwitterlink(e.target.value))}
          placeholder="https://twitterlink.com/id"
          className="border mt-10 border-gray-500 px-2 w-full md:w-1/4 rounded focus:outline-none border-2 focus:border-blue-200 h-8"
        />
        <button
        onClick={()=>handleGetTweet()}
        className="ml-10 inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 sm:w-auto"
        >get feed from twitter</button>
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
        onClick={() => {
          state === "customize" ? setState("accepted") : setState("customize");
        }}
        className={`px-3 cursor-pointer rounded-t py-2  ${
          state === "accepted" || state === "customize" ? "block" : "hidden"
        }`}
      >
        <a>Customize</a>
      </li>
    </ul>
  );
}



export function CustomizationBar({ state, setState }) {
  const style = state !== "customize" ? { display: "none" } : {};
  const [type,setType]= useState({name:"Background",type:"bgcolor"});

  const data = [
    {name:"Background",type:"bgcolor"},
    {name:"Card color",type:"cardBgColor"},
    {name:"Text Color",type:"textColor"},
    {name:"Seperartor",type:"sepColor"}]

  const handleClick = (type)=>{
    setType(type);
  }

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
      <div className="">
        <div className="relative pt-2">
          <div
            onClick={() => {
              setState("accepted");
            }}
            className="absolute border border-black rounded border-1 -left-10 cursor-pointer"
          >
            <CrossSvg />
          </div>
        </div>
        <div className=" flex flex-wrap gap-6 ml-10">
          {data.map((d,id)=>
          (<p 
            className={`cursor-pointer p-2 border border-2 rounded ${type?.name === d.name && "bg-eeorange-500 text-white"}`}
            onClick={()=>handleClick(d)}
          >
            {d.name}
          </p>)
          )}
        </div>
        <div className="absolute top-20 left-1/4">
          <BGColorPicker type={type?.type} />
          <p className="text-center">{type?.name}</p>
        </div>
      </div>

    </div>
  );
}

function BGColorPicker({type}){
  const context = useContext(ThemeContext)
  console.log(context[0])
  const handleChangeComplete = (color) => {
    const theme = {...context[0]};
    theme[type] = color.hex;
    context[1](theme);
  };
  return(
    <ChromePicker 
    color={context[0]?.[type]}
    onChange={handleChangeComplete}
    />
  )
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
