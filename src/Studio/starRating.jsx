import { useState } from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer",width:"4px" }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};
export const StarRating = ({setRating,rating}) => {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);
  console.log()
  // Manages rating selection
  console.log(rating)

  const hoverOver = (event) => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute("star-id")) {
      starId = event.target.getAttribute("star-id");
    }
    setSelection(starId);
  };

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={(event) => setRating(event.target.getAttribute("star-id"))}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
};
