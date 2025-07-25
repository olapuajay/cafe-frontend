import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"
export default function Header() {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const navlinks = (
    <>
      <Link to="/" onClick={toggleMenu} className="hover:text-[#FFB74D] duration-300">HOME</Link>
      <Link to="/products" onClick={toggleMenu} className="hover:text-[#FFB74D] duration-300">SHOP</Link>
      <Link to="/cart" onClick={toggleMenu} className="hover:text-[#FFB74D] duration-300">CART</Link>
      <Link to="/order" onClick={toggleMenu} className="hover:text-[#FFB74D] duration-300">ORDERS</Link>
    
      {/* <Link to="/admin" onClick={toggleMenu}>Admin</Link> */}
    
      {user?.role === "admin" && <Link to="/admin" onClick={toggleMenu}>ADMIN</Link>}
      
      {user?.token ? <Link to="/profile" onClick={toggleMenu}>PROFILE</Link> : <Link to="/login" onClick={toggleMenu} className="border border-[#FFB74D] text-[#FFB74D] py-2 px-4 rounded-4xl cursor-pointer hover:bg-[#FFB74D] hover:text-[#121212] duration-300 text-sm">LOGIN</Link> }
    </>
  )

  return (
    <nav className={`${isHomePage ? 'absolute' : 'relative shadow-md'} bg-transparent w-full top-0 z-50 text-[#D7CCC8] h-16 px-8 flex justify-between items-center transition-all duration-300`}>
      <Link to="/">
        <img src={logo} alt="LOGO" className="md:h-16 h-12" />
      </Link>

      <div className="hidden md:flex gap-8 items-center">
        {navlinks}
      </div>

      <button className="md:hidden z-50" onClick={toggleMenu}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#121212] text-[#D7CCC8] flex flex-col items-center gap-6 py-8 shadow-lg z-40">
          {navlinks}
        </div>
      )}
    </nav>
  );
}
