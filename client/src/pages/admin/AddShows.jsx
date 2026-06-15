import { useEffect, useState } from "react";
import { dummyShowsData } from './../../assets/assets';
import Loading from './../../components/Loading';
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import Title from "./../../components/admin/Title";
import { kConverter } from './../../lib/kConverter';
export default function AddShows()
{
    const currency= import.meta.env.VITE_CURRENCY;
    const [nowPlayingmovies,setnowplayingmovies] = useState([]);
    const [selectedmovie,setselectedmovie] = useState(null);
    const [dateTimeselection,setdatetimeselection] = useState({});
    const [datetimeinput,setdatetimeinput] = useState("");
    const [showPrice,setshowprice] = useState("");
    
     const fetchnowplayingmovies = async()=>{
        setnowplayingmovies(dummyShowsData);
     }
     const handledatetimeadd=() => {
        if (!datetimeinput) return;
        const [date, time] = datetimeinput.split("T");
        if(!date || !time) return;
        setdatetimeselection((prev)=>{
            const times=prev[date] || []
            if(!times.includes(time)) {
                return {...prev, [date]:[...times,time]}
            }
            return prev;
        })
     }
     const handleremovetime=(date,time) => {
       setdatetimeselection((prev)=>{
         const filteredTimes= prev[date].filter((t)=>t!==time)
         if(filteredTimes.length===0)
         {
            const{[date]: _, ...rest}=prev;
            return rest;
         }
         return {
            ...prev,
            [date]:filteredTimes,
         }
       })
     }
     useEffect(()=>{
        fetchnowplayingmovies();
     },[])
    return nowPlayingmovies.length >0 ?(
        <>
            <Title text1="Add" text2="Shows"/>
            <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
            <div className="overflow-x-auto pb-4"> 
  <div className="flex gap-4 mt-4 w-max">
    {nowPlayingmovies.map((movie) => (
      <div 
        key={movie.id} 
        className="relative max-w-40 cursor-pointer hover:-translate-y-1 transition duration-300"
      onClick={()=>setselectedmovie(movie.id)}>
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={movie.poster_path} 
            alt="" 
            className="w-full object-cover brightness-50 hover:brightness-100 transition duration-300"
          />
          <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
            <p className="flex items-center gap-1 text-gray-400">
              <StarIcon className="w-4 h-4 text-blue-500 fill-blue-500" />
              {movie.vote_average.toFixed(1)}
            </p>
            <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
          </div>
        </div>
        {selectedmovie === movie.id && (
            <div className="absolute top-2 right-2 flex items-center justify-center
            bg-blue-500 h-6 w-6 rounded">
                <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
             </div>   
        )}
        <p className="font-medium truncate">{movie.title}</p>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
        
      </div>
    ))}
  </div>                
</div>
        <div className="mt-8">
            <label className="block text-sm font-medium mb-2">Show Price</label>
            <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2
            rounded-md">
                <p className="text-gray-400 text-sm">{currency}</p>
                <input min={0} type="number" value={showPrice} onChange={(e)=>
                    setshowprice(e.target.value)} placeholder="Enter show price"
                    className="outline-none bg-transparent"
                />
            </div>
        </div>
        <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Select Time and Date</label>
            <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
                <input type="datetime-local" value={datetimeinput} onChange={(e)=>setdatetimeinput(e.target.value)}
                className="outline-none rounded-md bg-transparent" />
                <button className="bg-blue-500/80 text-white px-3 py-2 text-sm rounded-lg
                hover:bg-blue-500 cursor-pointer" onClick={handledatetimeadd}>
                    Add Time
                </button>
            </div>
        </div>
        {Object.keys(dateTimeselection).length>0 && (
            <div className="mt-6">
                <h2 className="mb-2">Selected Date-time</h2>
                <ul className="space-y-3">
                    {Object.entries(dateTimeselection).map(([date,times])=>(
                        <li key={date}>
                           <div className="font-medium">{date}</div>
                           <div className="flex flex-wrap gap-2 mt-1 text-sm">
                            {times.map((time)=>(
                                <div key={time} className="border border-blue-500 
                                px-2 py-1 flex items-center rounded">
                                    <span>{time}</span>
                                    <DeleteIcon onClick={()=> handleremovetime(date,time)} 
                                        width={15} className="ml-2 text-red-500 hover:text-red-700
                                        cursor-pointer"/>
                                 </div>   
                            ))}
                           </div>
                          </li> 
                    ))}
                </ul>
            </div>
        )}
        <button className="bg-blue-500/80 text-white px-8 py-2 mt-6 rounded hover:bg-blue-500 transition-all cursor-pointer">
            Add Show
        </button>
        </>
    ): (
        <Loading />
    )
}