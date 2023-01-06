import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { StarRating } from "./StarRating";
import { Api } from "../Apis/api";
import { CheckSvg } from "../icons";
import { getTestimonialData, updateAcceptedStatus } from "../services/common";
import { useParams } from "react-router-dom";


const testimonialdata = [
  {
    title: "It really works.",
    body: "I downloaded Pocket today and turned $5000 into $25,000 in half an hour.",
    author: "CrazyInvestor",
    rating: 4,
  },
  {
    title: "You need this app.",
    body: "I didn’t understand the stock market at all before Pocket. I still don’t, but at least I’m rich now.",
    author: "CluelessButRich",
    rating: 5,
  },
  {
    title: "This shouldn’t be legal.",
    body: "Pocket makes it so easy to win big in the stock market that I can’t believe it’s actually legal.",
    author: "LivingDaDream",
    rating: 5,
  },
  {
    title: "Screw financial advisors.",
    body: "I barely made any money investing in mutual funds. With Pocket, I’m doubling my net-worth every single month.",
    author: "JordanBelfort1962",
    rating: 5,
  },
  {
    title: "I love it!",
    body: "I started providing insider information myself and now I get new insider tips every 5 minutes. I don’t even have time to act on all of them. New Lamborghini is being delivered next week!",
    author: "MrBurns",
    rating: 5,
  },
  {
    title: "Too good to be true.",
    body: "I was making money so fast with Pocket that it felt like a scam. But I sold my shares and withdrew the money and it’s really there, right in my bank account. This app is crazy!",
    author: "LazyRich99",
    rating: 5,
  },
  {
    title: "Wish I could give 6 stars",
    body: "This is literally the most important app you will ever download in your life. Get on this before it’s so popular that everyone else is getting these tips too.",
    author: "SarahLuvzCash",
    rating: 5,
  },
  {
    title: "Bought an island.",
    body: "Yeah, you read that right. Want your own island too? Get Pocket.",
    author: "ScroogeMcduck",
    rating: 5,
  },
  {
    title: "No more debt!",
    body: "After 2 weeks of trading on Pocket I was debt-free. Why did I even go to school at all when Pocket exists?",
    author: "BruceWayne",
    rating: 5,
  },
  {
    title: "I’m 13 and I’m rich.",
    body: "I love that with Pocket’s transaction anonymization I could sign up and start trading when I was 12 years old. I had a million dollars before I had armpit hair!",
    author: "RichieRich",
    rating: 5,
  },
  {
    title: "Started an investment firm.",
    body: "I charge clients a 3% management fee and just throw all their investments into Pocket. Easy money!",
    author: "TheCountOfMonteChristo",
    rating: 5,
  },
  {
    title: "It’s like a superpower.",
    body: "Every tip Pocket has sent me has paid off. It’s like playing Blackjack but knowing exactly what card is coming next!",
    author: "ClarkKent",
    rating: 5,
  },
  {
    title: "Quit my job.",
    body: "I downloaded Pocket three days ago and quit my job today. I can’t believe no one else thought to build a stock trading app that works this way!",
    author: "GeorgeCostanza",
    rating: 5,
  },
  {
    title: "Don’t download this app",
    body: "Unless you want to have the best life ever! I am literally writing this from a yacht.",
    author: "JeffBezos",
    rating: 5,
  },
];

export function GridLayout({testimonialsData,setTestimonialData}) {
  console.log(testimonialsData)
  useEffect(() => {
    const userId = localStorage.getItem("id")
    // axios.get(`${Api}/testimonial/new-testimonial?id=${userId}`)
    // .then((res)=>res.data)
  }, []);
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {testimonialsData?.map((data) => (
          <Review data={data} setTestimonialData={setTestimonialData} />
        ))}
      </div>
    </div>
  );
}

function Review({ data,setTestimonialData }) {

  const [show,setShow] = useState(false);
  const {id} = useParams();
  function textData(text) {
    const maxTextLength = 100;
    
    if(show){
      return [text,true]
    }
    if (text?.length > maxTextLength) {
      return [text.slice(0, maxTextLength), true];
    } else {
      return [text, false];
    }
  }

  async function handleUpdatePendingStatus(docId){
      await updateAcceptedStatus(id,docId,0);
      getTestimonialData(id)
      .then((data)=>setTestimonialData(data))
  }

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <div
        className={
          "animate-fade-in rounded-xl bg-white p-6 opacity-1 shadow-xl"
        }
      >
        <div className="text-gray-900">
          {data.rating && <StarRating rating={data?.rating} />}
          <p className="mt-4 text-lg font-semibold leading-6 ">
            {data.title}
          </p>
          <p className="mt-3 text-base leading-7 grow">
            {textData(data.text)[0]}
            {textData(data.text)[1] && (
              <a 
              onClick={()=>setShow(!show)}
              className="text-blue-700 cursor-pointer underline">{show?"Hide":"..More"}</a>
            )}
          </p>
        </div>
        
        <div className=" mt-6 flex items-center justify-between  border-slate-100 pt-6">
          <div className="overflow-hidden rounded-full bg-slate-50">
            <img
              referrerpolicy="no-referrer"
              className="h-14 w-14 object-cover"
              src={data?.profile_image_url}
              alt=""
              width={56}
              height={56} />
          </div>
          <div>
            <p className="font-display text-base text-slate-900">
              {data?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div
          onClick={()=>handleUpdatePendingStatus(data.documentId)}
          className="px-2 flex py-1  cursor-pointer rounded text-white bg-eeorange-500">
          <CheckSvg /> Accept
          </div> 
        </div>
      </div>
    </div>
  );
}
