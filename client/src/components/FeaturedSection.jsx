import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets";

export default function FeaturedSection() {
  const navigate = useNavigate();
  console.log(dummyShowsData);
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden">
      {/* Header Section */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="100px" right="-80px" bottom="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>

        <button
          onClick={() => navigate("/movies")}
          className="flex items-center group gap-2 text-sm text-gray-300"
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-20">
        <button
          className="px-10 py-3 text-sm bg-blue-600 text-white hover:bg-blue-700 transition rounded-md font-medium cursor-pointer"
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
        >
          Show More
        </button>
      </div>
    </div>
  );
}
