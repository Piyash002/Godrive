import App from "@/App";
import About from "@/pages/user/About";
import ContactUs from "@/pages/user/ContuctUs";
import Home from "@/pages/user/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Shared/Login";
import Register from "@/pages/Shared/Register";
import AdminLayOut from "@/pages/admin/adminLayout/AdminLayOut";
import Addcars from "@/pages/admin/cars/Addcars";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import CarsPage from "@/pages/user/CarsPage";


export const  Router = createBrowserRouter([
    {
        path: "/",
        Component:App,
        children:[
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: ContactUs },
      { path: "booking", Component:CarsPage},
    
        ]
    },
    {
        path: "/admin",
        Component:AdminLayOut,
        children:[
      { index: true, Component: Dashboard},
      { path: '', Component: Dashboard},
      { path: "add-car", Component: Addcars },
    
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