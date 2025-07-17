import { useState, createContext } from "react";
import Register from "./pages/Register";
import Product from "./components/Product";
import Cart from "./pages/Cart";
import Order from "./components/Order";
import Admin from "./pages/Admin";
import Users from "./components/Users";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
export const AppContext = createContext();
function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  return (
    <div className="App-Container">
      <AppContext.Provider value={{ cart, setCart, user, setUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="login" element={<Login />} />
             <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="admin" element={<Admin />}>
              <Route index element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
export default App;
