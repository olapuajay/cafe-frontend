import { useState, createContext } from "react";
import Register from "./pages/users/Register";
import Product from "./pages/users/Product";
import Cart from "./pages/users/Cart";
import Order from "./pages/users/Order";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/users/Profile";
import Login from "./pages/users/Login";
import Products from "./pages/admin/Products";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Menu from "./pages/admin/Menu";
import MenuPage from "./pages/users/Menu";
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
            <Route path="menu" element={<MenuPage />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="admin" element={<Admin />}>
              <Route index element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="menu" element={<Menu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
export default App;
