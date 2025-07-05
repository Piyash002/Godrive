import App from "@/App";
import About from "@/pages/user/About";
import ContactUs from "@/pages/user/ContuctUs";
import Home from "@/pages/user/Home";
import { createBrowserRouter } from "react-router-dom";
import Booking from './../pages/user/Booking';
import Login from "@/pages/Shared/Login";
import Register from "@/pages/Shared/Register";

export const  Router = createBrowserRouter([
    {
        path: "/",
        Component:App,
        children:[
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: ContactUs },
      { path: "booking", Component: Booking },
    
        ]
    },
    {
      path:'/login',
      Component: Login
    },
    {
      path:'/register',
      Component: Register
    }
    
]) 