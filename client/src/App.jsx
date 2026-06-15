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
import DashBoard from './pages/admin/DashBoard';
import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import Layout from './pages/admin/Layout';
import AddShows from './pages/admin/AddShows';
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
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/admin/*" element={<Layout/>}>
          <Route index element={<DashBoard/>} />
          <Route path="add-shows" element={<AddShows/>}/>
          <Route path="list-shows" element={<ListShows/>} />
          <Route path="list-bookings" element={<ListBookings/>} />
        </Route>
      </Routes>
       <Toaster position="top-center" reverseOrder={false} />
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
