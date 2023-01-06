import { Api } from "../Apis/api";
import axios from "axios";
import { getTestimonialData } from "./common";


export async function getUpdatedTweets(twitterlink,id){
  const userId = localStorage.getItem("id");
    let testimonialData;
    const insertResp = await postNewTweet(twitterlink,id)
    console.log(twitterlink,id)
    if(insertResp.status){
      alert(insertResp.status)
    }
    if(insertResp){
      return await getTestimonialData(id)
    }
    
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