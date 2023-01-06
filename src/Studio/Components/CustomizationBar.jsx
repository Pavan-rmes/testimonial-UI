import { useState } from "react";
import { CrossSvg } from "../../icons";
import { BGColorPicker } from "./BGColorPicker";


export function CustomizationBar({ state, setState }) {
  const style = state !== "customize" ? { display: "none" } : {};
  const [type, setType] = useState({ name: "Background", type: "bgcolor" });

  const data = [
    { name: "Background", type: "bgcolor" },
    { name: "Card color", type: "cardBgColor" },
    { name: "Text Color", type: "textColor" },
    { name: "Seperartor", type: "sepColor" },
  ];

  const handleClick = (type) => {
    setType(type);
  };

  return (
    <div
      style={style}
      className={`fixed h-screen lg:w-5/12 w-1/2 bg-gray-50 right-0 top-0 ${state === "customize"
          ? "right-0 animate-slide-in-right"
          : "-right-4 animate-slide-out-right"} `}
    >
      <div className="">
        <div className="relative pt-2">
          <div
            onClick={() => {
              setState("accepted");
            }}
            className="absolute border border-black rounded border-1 -left-10 cursor-pointer"
          >
            <CrossSvg />
          </div>
        </div>
        <div className=" flex flex-wrap gap-6 ml-10">
          {data.map((d, id) => (
            <p
              className={`cursor-pointer p-2 border border-2 rounded ${type?.name === d.name && "bg-eeorange-500 text-white"}`}
              onClick={() => handleClick(d)}
            >
              {d.name}
            </p>
          ))}
        </div>
        <div className="absolute top-20 left-1/4">
          <BGColorPicker type={type?.type} />
          <p className="text-center">{type?.name}</p>
        </div>
      </div>
    </div>
  );
}
