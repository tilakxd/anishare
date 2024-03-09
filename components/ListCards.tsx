import React from "react";

function ListCards({ url, title, clicked, addComplete, id }: { url: string; title: string, clicked: boolean, id:string,  addComplete: (id: string) => void }) {
  const handleClick =  () => {
    addComplete(id);
  }
  return (
    <>
      <div className="w-full max-w-72 border-2 rounded-lg  items-center flex flex-col p-2">
        <img className="h-40 w-30 rounded-lg my-2" src={url} alt="" />

        <div className="text-white my-2">{title}</div>
        <button onClick={handleClick}  disabled = {clicked} className="text-white border-2 rounded-lg p-2 hover:text-darkblue hover:bg-white">
          completed
        </button>
      </div>
    </>
  );
}

export default ListCards;
