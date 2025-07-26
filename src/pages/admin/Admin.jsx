import React from "react";
import { Outlet, Link } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div className="flex justify-center items-center gap-6 md:p-4 p-2 bg-[#3E2723] text-[#D7CCC8]">
        <Link to="/admin">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/menu">Menu</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
