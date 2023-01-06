import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getGoogleAccounts, getGoogleReviews } from "../../../services/googleMaps";
import { testimonialsdata } from "../../studio";

export function GoogleReviewsSearchComponent({
  importFrom, setTestimonialData,setState
}) {

  const {id} = useParams()
  const box = useRef(null);
  const [businessName,setBusinessName] = useState("")
  const [focus, setFocus] = useState(false);
  const [accounts,setAccounts] = useState([])

  async function handleGoogleAccounts(){
    setAccounts(await getGoogleAccounts(businessName,id))
  }

  useEffect(() => {
 
    // Function for click event
    function handleOutsideClick(event) {
      if (box.current && !box.current.contains(event.target)) {
        setFocus(false);
      }
    }
 
    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [box]);

  return (
    <div 
    ref={box}
    className="relative">
      <div className="flex">
        <div className="w-1/2  ">
          <input
            onFocus={() => { setFocus(true); setState("pending"); }}
            // onBlur={() => setFocus(false)}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder={`${importFrom}`}
            className={` mt-3 border-gray-500 px-2 w-full rounded  focus:outline-none h-8 border-2`} />
          <p className={`absolute shadow-md rounded-b-md bg-white w-1/2 ${focus ? "block" : "hidden"}`}>
            {accounts.map((account)=>(<Suggestion wall_id={id} setTestimonialData ={setTestimonialData} account={account} />))}
          </p>
        </div>
        <button
          onClick={() => {handleGoogleAccounts(businessName);}}
          className="ml-10 mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 sm:w-auto"
        >
          get feed from {importFrom}
        </button>
      </div>
    </div>
  );
}


function Suggestion({account,setTestimonialData,wall_id}){
  async function handleGoogleReviews(place_id){
    getGoogleReviews(place_id,wall_id)
    .then((data)=>setTestimonialData(data))
  }
  console.log(testimonialsdata)
  return(
    <div 
    onClick={()=>{handleGoogleReviews(account.placeId)}}
    class="flex justify-between cursor-pointer py-2 px-3 hover:bg-slate-100">
      <p className="text-sm font-medium ">
        {account?.name} 
      </p>
      <p>
        {account?.reviewsCount} reviews 
      </p>
    </div>
  )
}