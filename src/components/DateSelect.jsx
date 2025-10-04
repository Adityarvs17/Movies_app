import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function DateSelect({ dateTime = {}, id }) {
  const dateKeys = Object.keys(dateTime);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const onBookHandler = () => {
    if (!selected) {
      toast.error("Please select a date"); // ✅ fixed
      return;
    }
    navigate(`/movies/${id}/${selected}`); // ✅ fixed with backticks
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="mt-20 pt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-blue-400 border border-blue-700/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {dateKeys.map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center
                    h-14 w-14 aspect-square rounded cursor-pointer ${
                      selected === date
                        ? "bg-white text-blue-800 font-bold shadow-lg"
                        : "bg-blue-800 text-white hover:bg-blue-700"
                    }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-blue-800 text-white px-8 py-2 mt-6 rounded hover:bg-blue-700 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
