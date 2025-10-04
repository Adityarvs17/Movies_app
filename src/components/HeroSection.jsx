import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate=useNavigate()
  return (
   <div className="bg-cover bg-center h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-36">
  <img
    src="/background_img2.jpg"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="relative z-10 items-start text-left">
    <h1 className="text-5xl md:text-[70px] md:leading-18 max-w-110 font-bold leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
      Welcome <br /> To Movie Lovers Hub
    </h1>
    <p className="text-lg md:text-xl text-font-bold leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
      Discover the best movies, watch trailers, and find showtimes near you.
      <br />Enjoy the movie experience like never before!
      <br />Join us today and dive into the world of cinema!
    </p>
    <button onClick={() => {navigate('/movies')}} className='mt-6 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition rounded-full font-medium cursor-pointer duration-300'>
        Explore Now
    </button>
  </div>
</div>
  );
}
