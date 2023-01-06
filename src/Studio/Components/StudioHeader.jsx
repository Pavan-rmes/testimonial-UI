import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { GoogleSvg, TwitterSvg } from "../../icons";
import { SelectImportFrom } from "./imports/SelectImportFrom";
import { useParams } from "react-router-dom";
import { getTestimonialWallName, updateTestimonialWallName } from "../../services/common";

export function StudioHeader({ setTestimonialData, id, setState }) {
  const [testimonialWallName, setTestimonialWallName] = useState(
    "New Testimonial Wall"
  );
  const [openModel, setOpenModal] = useState(false);
  const [importFrom, setImportFrom] = useState("twitter");
  const [wallNameUpdated,setWallNameUpdated] = useState(0);

  const ref = useRef(null);
  const handleEdit = () => {
    ref.current.focus();
  };
  const userId = localStorage.getItem("id");

  useEffect(()=>{
    getTestimonialWallName(userId,id)
    .then((data)=>setTestimonialWallName(data))
  },[])

  async function handleWallNameUpdate(){
    updateTestimonialWallName(testimonialWallName,userId,id)
    .then((data)=>console.log(data))
  }

  return (
    <div className="mt-2 mx-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            value={testimonialWallName}
            onChange={(e) => {setTestimonialWallName(e.target.value);setWallNameUpdated(1)}}
            onBlur={(e)=>{wallNameUpdated && handleWallNameUpdate()}}
            ref={ref}
            className="border border-gray-500 px-2 rounded focus:outline-none border-2 focus:border-orange-200 h-8" />
          <PencilSquareIcon
            onClick={handleEdit}
            className="text-gray-700 cursor-pointer w-5 h-5" />
        </div>

        <p className="border border-orange-200 cursor-pointer p-2 lg:mr-20 md:mr-10 mr-4 rounded border-2">
          &lt;&gt;Show Embed Code
        </p>
      </div>
      <div className="mt-7 gap-2 flex flex-row items-center cursor-pointer">
        <span
          onClick={() => {
            setImportFrom("google");
          }}
        >
          <GoogleSvg />
        </span>
        <span
          onClick={() => {
            setImportFrom("twitter");
          }}
        >
          <TwitterSvg />
        </span>
      </div>
      {<SelectImportFrom
        setTestimonialData={setTestimonialData}
        id={id}
        importFrom={importFrom}
        setState={setState} />}
    </div>
  );
}
