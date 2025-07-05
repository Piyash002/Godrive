
import { NavLink} from "react-router-dom";
// import {  useEffect, useRef, useState } from "react";
 import { FaRegCircleUser } from "react-icons/fa6";
import ThemeToggle from "@/hooks/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import AuthModal from "@/pages/Shared/AuthModal";
// import { SearchItem } from "../search/SearchItem";
const DesktopNavbar  = () => {
const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        SetModalOpen(false);
      }
    };

     document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const [searchValue, setSearchValue] = useState("");
  // const [queryParams, setQueryParams] = useState({ search: "" });
//   useEffect(() => {
//   const timer = setTimeout(() => {
//     setQueryParams({ search: searchValue });
//   }, 100);
//   return () => clearTimeout(timer);
// }, [searchValue]);

  const [modalOpen, SetModalOpen ] = useState(false)
  // // const handleModalOpen = ()=>{
  // //   SetModalOpen(!modalOpen)
  // // }
  return (
    <nav className="flex items-center justify-between max-w-[1230px] mx-auto  px-4 py-2.5   ">
      {/* Brand/Logo */}
      <div className="flex-shrink-0">
        <NavLink 
          to="/" 
          className="font-bold  text-white hover:text-gray-200 transition-colors duration-200 text-4xl"
        >
          <img src="/ChatGPT Image Jul 4, 2025, 05_05_40 PM.png
          " alt="" className="h-7 w-auto object-cover" />
        </NavLink>
      </div>
      {/* Navigation Links */}
      <ul className="flex items-center space-x-1">
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/booking" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
           Bookings
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Contact Us
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            About Us
          </NavLink>
        </li>
       
        {/* <li onClick={handleModalOpen} className=" text-white/90">
       <input autoFocus className=" text-black border-none 
         p-2 w-72  " type="text" 
         onKeyDown={(e) => {
         if (e.key === "Enter" && searchValue.trim()) {
          SetModalOpen(false);
    
       }
       }}
         onChange={(e) => setSearchValue(e.target.value)}
         placeholder="Search your keyword..."
         
       />
        {
       searchValue && (
       <SearchItem queryParams={queryParams}  setSearchValue={(val:any) => {
              setSearchValue(val);
              SetModalOpen(false);
            }} />
      
      )}

        </li > */}
         {/* <li className="px-4 ">
          <Cart />
        </li> */}
         <li className="px-2 ">
        <ThemeToggle/>
        </li>
        <li >
          <div className="font-bold ">
                 {/* {
                  user?<><li className="btn btn-outline  px-2 hover:bg-secondary bg-opacity-15" onClick={handleLogout}>Logout</li></>:
                 }
                */}
        <button onClick={()=>SetModalOpen(true)} className="text-3xl">
         <FaRegCircleUser />
        </button>
        </div>
         {modalOpen && <AuthModal onClose={() => SetModalOpen(false)} />}
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavbar;