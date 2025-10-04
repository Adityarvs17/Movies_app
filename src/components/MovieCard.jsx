import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeFormat from './../lib/timeformat';

export default function MovieCard({ movie }) {
    const navigate=useNavigate()
    return (
        <div className='flex flex-col justify-between p-3 bg-gray-800 
        rounded-2xl hover:translate-y-1 transition duration-300 w-full'>
            <img onClick={() => {navigate(`/movie/${movie._id}`);scrollTo(0,0)}} 
            src={movie.backdrop_path} alt="" className="rounded-lg h-52 w-full object-cover
            object-right-bottom cursor-pointer"/>
            <p className='font-semibold mt-2 truncate'>{movie.title}</p>
            <p className='tex-sm text-gray-400 mt-2'>
                {new Date(movie.release_date).getFullYear()}◽{movie.genres.slice(0,2)
                .map(g=>g.name).join(' | ')}◽{timeFormat(movie.runtime)}
            </p>
            <div className="flex items-center justify-between mt-4 pb-3">
                <button onClick={() => {navigate(`/movie/${movie.id}#dateSelect`);scrollTo(0,0)}} 
                className="px-4 py-2 text-xs bg-blue-600 text-white hover:bg-blue-700
                transition rounded-full font-medium cursor-pointer mt-3">
                    Buy Tickets
                </button>
                <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                    <StarIcon className="w-4 h-4 text-blue-600 fill:primary"/>
                    {movie.vote_average.toFixed(1)}
                </p>
            </div>
        </div>
    );
}