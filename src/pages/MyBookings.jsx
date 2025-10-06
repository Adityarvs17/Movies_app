import { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from './../lib/timeformat';
import { dateFormat } from './../lib/dateFormat';


export default function MyBookings() {
    const currency= import.meta.env.VITE_CURRENCY;
    const [bookings,setbookings]= useState([])
    const [isloading,setisloading] = useState(true)
    
    const getBookings = async () =>{
        setbookings(dummyBookingData)
        setisloading(false)
    }
    useEffect(()=>{
        getBookings();
    },[])
    return !isloading ? (
        <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
            <BlurCircle top="100px" left="100px" />
            <div>
                <BlurCircle bottom="0px" left="600px" />
            </div>
            <h1 className="text-lg font-semibold mb-4 text-left">My Bookings</h1>
            {bookings.map((item,index)=>(
                <div 
                    key={index} 
                    className="flex flex-col md:flex-row justify-between 
                    bg-blue-500/8 border border-blue-500/20 rounded-lg mt-4 p-2 max-w-3xl"
                >
                    <div className="flex flex-col md:flex-row">
                        
                        <div className="w-full md:w-45 md:h-40 flex-shrink-0">
                            <img 
                                src={item.show.movie.poster_path} 
                                alt={item.show.movie.title} 
                                className="w-full h-full object-cover object-bottom rounded"
                            />
                        </div>

                        <div className="flex flex-col p-4">
                            <p className="text-lg font-semibold text-left">{item.show.movie.title}</p>
                            <p className="text-gray-400 text-sm">{timeFormat(item.show.movie.runtime)}</p>
                            <p className="text-gray-400 text-sm mt-auto">{dateFormat(item.show.showDateTime)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ): (
        <Loading />
    )

}

