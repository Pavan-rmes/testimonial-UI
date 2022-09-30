// import { Container } from '@/components/Container'
import { useState } from "react";
import avatarImage1 from "../images/avatars/avatar-1.png";
import avatarImage2 from "../images/avatars/avatar-2.png";
import avatarImage3 from "../images/avatars/avatar-3.png";
import avatarImage4 from "../images/avatars/avatar-4.png";
import avatarImage5 from "../images/avatars/avatar-5.png";
import { MasonryLayout } from "./MasonryLayout";
import {Verticalscroll} from "./Verticalscroll"

export const testimonials = [
  [
    {
      content:
        "TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.",
      author: {
        name: "Sheryl Berge",
        role: "CEO at Lynch LLC",
        image: avatarImage1,
      },
    },
    {
      content:
        "I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.",
      author: {
        name: "Amy Hahn",
        role: "Director at Velocity Industries",
        image: avatarImage4,
      },
    },
  ],
  [
    {
      content:
        "The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.",
      author: {
        name: "Leland Kiehn",
        role: "Founder of Kiehn and Sons",
        image: avatarImage5,
      },
    },
    {
      content:
        "There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.",
      author: {
        name: "Erin Powlowski",
        role: "COO at Armstrong Inc",
        image: avatarImage2,
      },
    },
  ],
  [
    {
      content:
        "I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.",
      author: {
        name: "Peter Renolds",
        role: "Founder of West Inc",
        image: avatarImage3,
      },
    },
    {
      content:
        "This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.",
      author: {
        name: "Amy Hahn",
        role: "Director at Velocity Industries",
        image: avatarImage4,
      },
    },
  ],
];

export function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

export function Testimonials({state}) {

  return (
    <div >
      {(()=>{
        switch (state){
          case "pending":
            return <MasonryLayout />
          case "customize":
          case "accepted":
            return <AcceptedReviews />
          case "insights":
            return <MasonryLayout />
        }
      })()
      }
    </div>
    )
}


function AcceptedReviews(){
  return(
    <div className="mt-10">
      {/* <LayoutType /> */}
      <Verticalscroll />
    </div>
  )
}

function LayoutType(){
  return(
    <div className="flex justify-center px-4 gap-10 mb-6">
      <p>Static</p>
      <p>Scroll</p>
      <p>Caurosal</p>
    </div>
  )
}




