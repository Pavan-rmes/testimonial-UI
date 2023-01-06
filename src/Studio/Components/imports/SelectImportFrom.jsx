import { TwitterSearchComponent } from "./TwitterSearchComponent";
import { GoogleReviewsSearchComponent } from "./GoogleReviewsSearchComponent";


export function SelectImportFrom({
  importFrom, setTestimonialData, setState
}) {
  if (importFrom === "twitter") {
    return (
      <TwitterSearchComponent
        setTestimonialData={setTestimonialData}
        importFrom={importFrom} />
    );
  }
  if (importFrom === "google") {
    return (
      <GoogleReviewsSearchComponent
        setTestimonialData={setTestimonialData}
        importFrom={importFrom}
        setState={setState} />
    );
  }
}
