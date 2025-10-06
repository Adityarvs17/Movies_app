import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummyDateTimeData, dummyShowsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

export default function SeatLayout() {
  const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]];
  const { id, date } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate=useNavigate()


   useEffect(() => {
    const getShow = () => {
      const foundShow = dummyShowsData.find((show) => show._id === id);
      if (foundShow) {
        setShow({
          movie: foundShow,
          dateTime: dummyDateTimeData,
        });
      }
    };
    getShow();
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error('Please select time first');
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
      return toast.error('You can select only 4 seats');
    }
    setSelectedSeats(prev => prev.includes(seatId)
      ? prev.filter(seat => seat !== seatId)
      : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="mt-2">
      <div className="grid grid-cols-9 gap-2 justify-center">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-blue-500/60 cursor-pointer ${
                selectedSeats.includes(seatId) && "bg-blue-500 text-white"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!show) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row gap-x-12 px-6 md:px-12 lg:px-40 py-20 md:pt-28 pt-28 pb-10">
      
      {/* LEFT SIDE: Available Timings */}
      <div className="w-60 flex-none bg-blue-800/10 border border-blue-500/20 rounded-lg py-10 h-max md:sticky md:top-28 md:mr-12 md:-ml-4">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle bottom="-130px" right="-210px" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map(row => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
        <button onClick={()=>navigate('/my-bookings')} className="flex items-center gap-1 mt-20 px-10 py-3 text-sm
        bg-blue-500 hover:bg-blue-700 transition rounded-full font-medium 
        cursor-pointer active:scale-95"> 
            Proceed To Checkout
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
