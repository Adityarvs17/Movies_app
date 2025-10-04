import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import logo from '../assets/logo.png';
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  //const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={logo} alt="Logo" className="w-24 h-auto" />
      </Link>

      <div className={`${isOpen ? "flex" : "hidden"} max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-black/90 max-md:flex-col max-md:items-center max-md:justify-center md:flex md:flex-row gap-8 font-bold leading-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent transition-all duration-300`}>
        <X onClick={() => setIsOpen(false)} className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" />
        <Link to="/" onClick={() => {setIsOpen(false);scrollTo(0,0)}}>Home</Link>
        <Link to="/movies" onClick={() => {setIsOpen(false);scrollTo(0,0)}}>Movies</Link>
        <Link to="/theatres" onClick={() => {setIsOpen(false);scrollTo(0,0)}}>Theatres</Link>
        <Link to="/releases" onClick={() => {setIsOpen(false);scrollTo(0,0)}}>Releases</Link>
        <Link to="/favourites" onClick={() => {setIsOpen(false);scrollTo(0,0)}}>Favourites</Link>
      </div>

      <div className="flex items-center gap-8">
        <Search className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <button onClick={() => openSignIn()} className="px-4 py-1 sm:px-7 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white transition rounded-full font-medium cursor-pointer">
            Login
          </button>
        ) : (
            <UserButton/>
        )}
      </div>

      <Menu onClick={() => setIsOpen(true)} className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" />
    </div>
  );
}
