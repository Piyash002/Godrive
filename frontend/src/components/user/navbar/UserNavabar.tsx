
import { useState, } from "react";
import MobileNavigation from "./MobileResponsiveNavbar";
import DesktopNavbar from "./DesktopNavbar";

import ThemeToggle from "@/hooks/ThemeToggle";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthModal from "@/pages/Shared/AuthModal";
const UserNavabar = () => {
     const [searchValue, setSearchValue] = useState("");
  // const [queryParams, setQueryParams] = useState({ search: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;
  // const dispatch = useAppDispatch();
  // Handle live search debounce
  //   useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setQueryParams({ search: searchValue });
  //   }, 200);
  //   return () => clearTimeout(timer);
  // }, [searchValue]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const [ModalOpen, SetModalOpen ] = useState(false)
  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setIsMobileMenuOpen(false);
    }
  };
    return (
        <div>
      <header className="bg-[#2E1065] text-white sticky top-0 z-50 shadow-md mx-auto w-full text-center">
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
          <div className="flex items-center justify-center">
             <ThemeToggle/>
            <button className="text-3xl  px-2 py-1 rounded">
         
              <div className="font-bold ">
                               {/* {
                                user?<><li className="btn btn-outline  px-2 hover:bg-secondary bg-opacity-15" onClick={handleLogout}>Logout</li></>:
                               }
                              */}
      <button onClick={()=>SetModalOpen(true)} className="text-3xl">
                       <FaRegCircleUser />
                      </button>
                      </div>
                       {ModalOpen && <AuthModal onClose={() => SetModalOpen(false)} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Modal */}
        {modalOpen && (
          <div className="fixed inset-16 top-7 z-50 flex items-start justify-center pt-12 px-4"
           id="search-backdrop"
          onClick={(e) => {
        if ((e.target as HTMLElement).id === "search-backdrop") {
        setModalOpen(false);
      }
    }}>
            <div className="w-full max-w-md relative">
              <input
                autoFocus
                type="text"
                className="w-full p-2 rounded bg-primary text-white border-none outline-none"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    setModalOpen(false);
                  }
                }}
              />
              {/* {searchValue && (
              <div className="">
                  <SearchItem
                  queryParams={queryParams}
                  setSearchValue={(val: any) => {
                    setSearchValue(val);
                    setModalOpen(false);
                  }}
                />
              </div>
              )} */}
            </div>
          </div>
        )}

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