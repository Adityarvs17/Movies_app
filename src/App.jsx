import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MyBookings from './pages/MyBookings';
import MovieDetails from './pages/MovieDetails';
import Favourites from './pages/Favourites';
import SeatLayout from './pages/SeatLayout';
import './App.css';
import { Toaster } from 'react-hot-toast';
const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/seat-layout" element={<SeatLayout />} />
      </Routes>
       <Toaster position="top-center" reverseOrder={false} />
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
