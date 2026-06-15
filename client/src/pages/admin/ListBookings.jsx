import { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from './../../components/Loading';
import Title from "../../components/admin/Title";
import dateFormat from './../../lib/dateFormat';
export default function ListBookings(){
    const currency= import.meta.env.VITE_CURRENCY;
    const [bookings,setBookings]= useState([]);
    const [isLoading,setisLoading]=useState(true);
    const getAllBookings = async()=>{
        setBookings(dummyBookingData)
        setisLoading(false)
    }
    useEffect(()=>{
        getAllBookings();
    },[]) 
    return !isLoading ? (
        <>
            <Title text1="List" text2="Bookings"/>
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-blue-500/20 text-left text-white">
                        <th className="p-2 font-medium pl-5">User Name</th>
                        <th className="p-2 font-medium">Movie Name</th>
                        <th className="p-2 font-medium">Show Time</th>
                        <th className="p-2 font-medium">Seats</th>
                        <th className="p-2 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        {bookings.map((item,index)=>(
                            <tr key={index} className="border-b border-blue-500/20
                            bg-blue-500/5 even:bg-blue-500/10">
                                 <td className="p-2 min-w-45 text-left pl-5">{item.user.name}</td>
                                 <td className="p-2 text-left">{item.show.movie.title}</td>
                                 <td className="p-2 text-left">{dateFormat(item.show.showDateTime)}</td>
                                 <td className="p-2 text-left">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>       
                                 <td className="p-2 pr-5 text-left">{currency} {item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ):(
       <Loading />
    )
} 