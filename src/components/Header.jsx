import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import logo from "../assets/logo.png"
export default function Header() {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <nav className={`${isHomePage ? 'absolute' : 'relative shadow-md'} bg-transparent w-full top-0 z-50 text-[#D7CCC8] h-16 px-8 flex justify-between items-center transition-all duration-300`}>
      <Link to="/">
        <img src={logo} alt="LOGO" className="h-16" />
      </Link>
      <div className="flex md:gap-8 items-center">
        <Link to="/" className="hover:text-[#FFB74D] duration-300">HOME</Link>
        <Link to="/products" className="hover:text-[#FFB74D] duration-300">SHOP</Link>
        <Link to="/cart" className="hover:text-[#FFB74D] duration-300">CART</Link>
        <Link to="/order" className="hover:text-[#FFB74D] duration-300">ORDERS</Link>

        {/* <Link to="/admin">Admin</Link> */}

        {user?.role === "admin" && <Link to="/admin">ADMIN</Link>}
        
        {user?.token ? <Link to="/profile">PROFILE</Link> : <Link to="/login" className="border border-[#FFB74D] text-[#FFB74D] py-2 px-4 rounded-4xl cursor-pointer hover:bg-[#FFB74D] hover:text-[#121212] duration-300 text-sm">LOGIN</Link> }
      </div>
    </nav>
  );
}
