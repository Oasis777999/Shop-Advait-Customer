import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import DetailedProduct from "./Components/DetailedProduct";
import CheckoutPage from "./Components/CheckoutPage";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutUs from "./Components/AboutUs";
import CartPage from "./Components/CartPage";

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
        <div className="flex-grow-1 bg-light min-vh-100">
          <Routes>
            {/* User */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/product/:id" element={<DetailedProduct />}></Route>
            <Route path="/checkout/:id" element={<CheckoutPage />}></Route>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
