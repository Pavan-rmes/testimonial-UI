import axios from "axios";
import { Api } from "../Apis/api";

export async function getTestimonialData(id){
    let testimonialData;
    await axios.get(`${Api}/testimonial/all-testimonials?id=${id}`)
      .then((data)=>(testimonialData = data.data))
      .catch((e)=>console.log(e))
    return testimonialData
}

export async function updateAcceptedStatus(wall_id,doc_id,isAccepted){
    console.log(typeof(isAccepted))
    await axios.post(`${Api}/testimonial/testimonial-status`,{wall_id,doc_id,isAccepted:!isAccepted})
    .then((res)=>console.log(res))
    return true;
}

export async function getTestimonialWallName(userId,wall_id){
    let testimonialWallName;
    await axios.get(`${Api}/testimonialWalls/get-data?user_id=${userId}&wall_id=${wall_id}`)
    .then((data)=>testimonialWallName = data.data?.wallName)
    console.log(userId,wall_id,testimonialWallName)
    return testimonialWallName
}

export async function updateTestimonialWallName(wall_name,user_id,wall_id){
  let response;
  console.log(wall_id,user_id,wall_name)
  await axios.put(`${Api}/testimonialWalls/update-wall-name`,{wall_name,user_id,wall_id})
  .then((data)=> (response = data.data))
  .catch(e=>console.log(e))
}