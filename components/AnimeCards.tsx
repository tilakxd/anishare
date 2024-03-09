import React from "react";

function AnimeCards({
  url,
  title,
  sourcefile,
  addList,
}: {
  url: string;
  title: string;
  sourcefile: string;
  addList: (url: string, title: string) => any;
}) {
    const handleClick = () => {
        addList(url, title); // Call the addList function with url and title
      };
    
  return (
    <>
      <div className="w-full max-w-72 border-2 rounded-lg  items-center flex flex-col p-2">
        <a href={sourcefile} target="_blank">
          <img className="h-40 w-30 rounded-lg my-2" src={url} alt="" />
        </a>
        <div className="text-white my-2">{title}</div>
        <button
          onClick={handleClick}
          className="text-white border-2 rounded-lg p-2 hover:text-darkblue hover:bg-white"
        >
          Add To list
        </button>
      </div>
    </>
  );
}

export default AnimeCards;
