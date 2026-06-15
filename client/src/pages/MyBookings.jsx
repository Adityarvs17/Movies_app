import { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from './../lib/timeformat';
import  dateFormat  from './../lib/dateFormat';

export default function MyBookings() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-32 md:pt-40 min-h-[80vh]">
      {/* Background effects */}
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" right="-160px" />

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8 text-left">My Bookings</h1>

      {/* Booking Cards */}
      <div className="flex flex-col items-center space-y-6">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between 
              bg-blue-500/10 border border-blue-500/20 rounded-2xl 
              w-full max-w-4xl p-5 md:p-6 shadow-sm"
          >
            {/* Left section (Poster + Info) */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="w-full md:w-44 h-32 md:h-28 rounded overflow-hidden">
                <img
                  src={item.show.movie.poster_path}
                  alt={item.show.movie.title}
                  className="w-full h-full object-cover object-center rounded-md"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-lg font-semibold text-left">{item.show.movie.title}</p>
                <p className="text-gray-400 text-sm">{timeFormat(item.show.movie.runtime)}</p>
                <p className="text-gray-400 text-sm mt-1">{dateFormat(item.show.showDateTime)}</p>
              </div>
            </div>

            {/* Right section (Price + Button + Details) */}
            <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold">{currency}{item.amount}</p>
                {!item.isPaid && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 transition text-white 
                      px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              <div className="text-sm mt-2 md:mt-0">
                <p>
                  <span className="text-gray-400 mr-1">Total Tickets:</span>
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400 mr-1">Seat Number:</span>
                  {item.bookedSeats.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
