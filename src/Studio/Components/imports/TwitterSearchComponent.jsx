import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUpdatedTweets } from "../../../services/twitter";

export function TwitterSearchComponent({
  importFrom, setTestimonialData
}) {

  const { id } = useParams();
  console.log(id)
  const [link,setLink] = useState("")
  async function handleGetTweet() {
    if (importFrom == "twitter") {
      setTestimonialData(await getUpdatedTweets(link, id));
      console.log("twitter");
    }
    setLink("");
  }

  return (
    <div>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={`${importFrom}`}
        className="border mt-3 border-gray-500 px-2 w-full md:w-1/2 rounded focus:outline-none border-2 focus:border-blue-200 h-8" />
      <button
        onClick={() => handleGetTweet()}
        className="ml-10 inline-flex items-center justify-center rounded-md border border-transparent bg-eeorange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-eeorange-700 sm:w-auto"
      >
        get feed from {importFrom}
      </button>
    </div>
  );
}
