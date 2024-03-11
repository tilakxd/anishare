import React, { useEffect, useState } from "react";
import axios from "axios";

function ListCards({
  url,
  title,
  clicked,
  _id,
  deleteAnime,
}: {
  url: string;
  title: string;
  clicked: boolean;
  _id: string;
  deleteAnime: (_id: string) => any;
}) {
  const [complete, setComplete] = useState(false);
  const apiUrl = process.env.API_URL
  axios.defaults.baseURL = apiUrl
  const completeAdd = async (_id: string) => {
    try {
      const response = await axios.put("/api/complete", {
        _id,
      });
      console.log(response.data.completed);
      setComplete(response.data.completed); // Update the complete state with the new value
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchCompletion = async (_id: string) => {
        const response = await axios.post(
          "/api/complete",
          { _id }
        );
        console.log(response.data.completed);
        setComplete(response.data.completed);
      };
      fetchCompletion(_id);
    } catch (error) {}
  }, []);

  const handleClick = () => {
    deleteAnime(_id);
  };

  // Determine button color and text based on the complete state
  const buttonColor = complete ? "bg-green-500" : "bg-red-500";
  const buttonText = complete ? "Completed" : "Still Watching";

  return (
    <>
      <div className="w-full max-w-72 border-2 rounded-lg items-center flex flex-col p-2">
        <button onClick={handleClick} className="flex place-items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
            />
          </svg>
        </button>
        <img className="h-40 w-30 rounded-lg my-2" src={url} alt="" />
        <div className="text-white my-2">{title}</div>
        <button
          disabled={clicked}
          onClick={() => completeAdd(_id)}
          className={`text-white border-2 rounded-lg p-2 ${buttonColor} ${
            !clicked ? "hover:text-darkblue hover:bg-white" : ""
          }`}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}

export default ListCards;
