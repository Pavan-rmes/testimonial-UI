import { Api } from "../Apis/api";
import axios from "axios";

export async function getGoogleAccounts(businessName,testimonialId){
    let accounts = []
    await axios.get(`${Api}/google-reviews/accounts?account=${businessName}`)
    .then((data)=>(accounts = data.data))
    return accounts
}

export async function getGoogleReviews(place_id,wall_id){
    let reviews
    await axios.get(`${Api}/google-reviews/reviews?place_id=${place_id}&wall_id=${wall_id}`)
    .then((data)=>(reviews = data.data))
    return reviews;
}