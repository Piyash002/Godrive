import { useEffect, useState } from "react";
import MobileNavigation from "./MobileResponsiveNavbar";
import DesktopNavbar from "./DesktopNavbar";
import ThemeToggle from "@/hooks/ThemeToggle";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthModal from "@/pages/Shared/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutUser } from "@/redux/features/auth/authSlice";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setIsMobileMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-[#2E1065] text-white fixed top-0 left-0 z-50 w-full shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden
       py-3  w-full">
        <div className="flex items-center justify-between px-4">
          {/* Menu Toggle */}
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

          {/* Logo */}
          <a href="/" className="font-bold font-serif">
            <img
              src="/ChatGPT Image Jul 4, 2025, 05_05_40 PM.png"
              alt="Logo"
              className="h-7 w-auto object-contain"
            />
          </a>

          {/* User & Theme */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <button
                className="btn btn-outline px-2 hover:bg-secondary bg-opacity-15"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button onClick={() => setModalOpen(true)} className="text-3xl">
                <FaRegCircleUser />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Slide Menu */}
        {isMobileMenuOpen && (
          <div
            id="backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 top-0 left-0   z-40"
          >
            <nav className="fixed top-16 left-0 h-full w-64
              overflow-y-auto bg-[#2E1065]  z-50 p-4">
              <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </nav>
          </div>
        )}
        {/* Auth Modal */}
        {modalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
      </div>
    </header>
  );
};

export default UserNavbar;
