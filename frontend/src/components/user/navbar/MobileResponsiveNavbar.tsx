/* eslint-disable @typescript-eslint/no-explicit-any */
const MobileNavigation= ({setIsMobileMenuOpen}:any) => {
    return (
        <div>
         <ul className="space-y-1 text-start">
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/booking"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Bookings
                  </a>
                </li>

                <li>
                  <a
                    href="/booking"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                   Bookings
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  Login
                  </a>
                </li>
              </ul>
        </div>
    );
};

export default MobileNavigation;

