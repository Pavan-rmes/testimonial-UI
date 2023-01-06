function StudioNavigationBar({ state, setState }) {
  return (
    <ul className="mx-4 my-10 flex border-b-2 border-blue-600 mb-4">
      <li
        onClick={() => {
          setState("pending");
        }}
        className={`px-3 py-2 cursor-pointer rounded-t ${state === "pending" && "bg-blue-600 text-white"}`}
      >
        <a>Pending</a>
      </li>
      <li
        onClick={() => {
          setState("accepted");
        }}
        className={`px-3 cursor-pointer rounded-t py-2 ${(state === "accepted" || state === "customize") &&
          "bg-blue-600 text-white"}`}
      >
        <a>Accepted</a>
      </li>
      <li
        onClick={() => {
          setState("insights");
        }}
        className={`px-3 cursor-pointer rounded-t py-2 ${state === "insights" && "bg-blue-600 text-white"}`}
      >
        <a>Insights</a>
      </li>
      <li
        onClick={() => {
          state === "customize" ? setState("accepted") : setState("customize");
        }}
        className={`px-3 cursor-pointer rounded-t py-2  ${state === "accepted" || state === "customize" ? "block" : "hidden"}`}
      >
        <a>Customize</a>
      </li>
    </ul>
  );
}
