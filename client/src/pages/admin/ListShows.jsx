import { useEffect, useState } from "react"
import Loading from './../../components/Loading';
import { dummyShowsData } from './../../assets/assets';
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat"
export default function ListShows(){
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const currency= import.meta.env.VITE_CURRENCY;
    const getAllShows = async ()=> {
        try {
            setShows([{
                movie:dummyShowsData[0],
                showDateTime:"2025-06-30T02:30:00.000Z",
                showPrice:59,
                occupiedSeats:{
                    A1: 'user_1',
                    B1: 'user_2',
                    C1: 'user_3'
                }
            }]);
            setLoading(false)
        }
        catch(error)
        {
            console.error(error)
        }
    }
    useEffect(()=>{
        getAllShows();
    },[])
    return !loading?(
        <>
          <Title text1="List" text2='Shows' />  
          <div className="max-w-4xl mt-6 overflow-x-auto">
            <table className="w-full border-collapse rounded-nd overflow-hidden text-nowrap">
              <thead>
                <tr className="bg-blue-500/20 text-left text-white">
                <th className="p-2 font-medium pl-5">Movie Name</th>
                <th className="p-2 font-medium">Show Time</th>
                <th className="p-2 font-medium">Total Bookings</th>
                <th className="p-2 font-medium">Earnings</th>
                </tr>
              </thead>
             <tbody className="text-sm font-light">
  {shows.map((show, index) => (
    <tr
      key={index}
      className="border-b border-blue-500/10 bg-blue-500/5 even:bg-blue-500/10"
    >
      <td className="p-2 min-w-45 text-left pl-5">
        {show.movie.title}
      </td>
      <td className="p-2 text-left">
        {dateFormat(show.showDateTime)}
      </td>
      <td className="p-2 text-left">
        {show.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0}
      </td>
      <td className="p-2 pr-5 text-left">
        {currency} {Object.keys(show.occupiedSeats).length * show.showPrice}
      </td>
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