import React from "react";
import banner from "../assets/banner.jpg";
import { Link, useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center p-6"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="text-start w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
          Dev<span className="text-[#8B6B5E]">Bean</span>
        </h1>
        <p className="md:text-lg text-md text-[#D7CCC8] mb-6">
          Every Bean, Every Bite, Made to Delight.
        </p>
        <p className="md:text-xl text-md text-[#D7CCC8]">
          Discover the taste of home with our handcrafted pastries, artisan
          breads, and freshly brewed coffee. Order online or visit us to
          experience the magic.
        </p>
        <div className="flex gap-4 mt-6">
          <button onClick={() => navigate("/products")} className="bg-[#FFB74D] text-[#121212] py-2 px-4 rounded-4xl cursor-pointer hover:bg-[#e68c32] duration-300">
            Order Now
          </button>
          <button onClick={() => navigate("/menu")} className="bg-transparent border-2 border-[#FFB74D] text-[#FFB74D] py-2 px-4 rounded-4xl cursor-pointer hover:bg-[#FFB74D] hover:text-[#121212] duration-300">
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
