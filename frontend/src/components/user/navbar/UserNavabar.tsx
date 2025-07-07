
import { useState, } from "react";
import MobileNavigation from "./MobileResponsiveNavbar";
import DesktopNavbar from "./DesktopNavbar";
import ThemeToggle from "@/hooks/ThemeToggle";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthModal from "@/pages/Shared/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutUser } from "@/redux/features/auth/authSlice";
const UserNavabar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;
       const handleLogout = () => {
      dispatch(logoutUser());
    }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const [ModalOpen, SetModalOpen ] = useState(false)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setIsMobileMenuOpen(false);
    }
  };
    return (
        <div>
      <header className="bg-[#2E1065] text-white sticky top-0 z-50 shadow-md mx-auto w-full text-center h-fit">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <DesktopNavbar/>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden  py-3 w-full  mx-auto">
        <div className="flex items-center justify-between mx-auto text-center">
          {/* Left: Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {/* Center: Logo */}
          <a href="/" 
          className=" font-bold font-serif">
           <img src="/ChatGPT Image Jul 4, 2025, 05_05_40 PM.png" alt="" className="h-7 w-auto object-contain"   />
          </a>

          {/* Right: Cart and Search */}
          <div className="flex items-center justify-center px-1.5">
             <ThemeToggle/>
          <div className="  font-bold ">
                 {
                  user?<><button className="btn btn-outline  px-2 hover:bg-secondary bg-opacity-15" onClick={handleLogout}>Logout</button></>: <button onClick={()=>SetModalOpen(true)} className="text-3xl">
         <FaRegCircleUser />
        </button>}
        </div>
         {ModalOpen && <AuthModal onClose={() => SetModalOpen(false)} />}
          </div>
        </div>
        {/* Mobile Slide Menu */}
        {isMobileMenuOpen && (
          <div
            id="backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-y-16 mt-0 inset-x-0 z-40 bg-opacity-50"
          >
            <nav className="absolute top-0 left-0  h-full bg-[#2E1065]  shadow-xl z-50 p-4  w-full mx-auto">
              <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </nav>
          </div>
        )}
      </div>

    </header>
        </div>
    );
};

export default UserNavabar;