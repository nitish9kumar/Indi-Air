import React, { useState, useEffect } from "react";
import AirlineLogo from "./AirlineLogo";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link } from "wouter";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  
  return (
    <header className={pageTitle? `z-50 transition-none bg-transparent text-black  py-3`:`absolute fixed w-full z-50 transition-none bg-transparent text-white py-3`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <AirlineLogo />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-[#FF9933] transition-colors">
              Home
            </Link>
            <Link href="/destinations" className="font-medium hover:text-[#FF9933] transition-colors">
              Destinations
            </Link>
            <Link href="/offers" className="font-medium hover:text-[#FF9933] transition-colors">
              Offers
            </Link>
            <Link href="/about" className="font-medium hover:text-[#FF9933] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="font-medium hover:text-[#FF9933] transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {loggedInUser && <span className="hidden md:flex text-[#FFFFFF]">Welcome, {loggedInUser}!</span>}
            <Link href="/profile" className="hidden md:flex text-[#FFFFFF] hover:text-[#FF9933] transition-colors">
              <User className="h-5 w-5" />
            </Link>
            {!loggedInUser && (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE] hover:text-white"
                >
                  Login
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-5 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-medium hover:text-[#FF9933] transition-colors text-black">
                Home
              </Link>
              <Link href="/destinations" className="font-medium hover:text-[#FF9933] transition-colors text-black">
                Destinations
              </Link>
              <Link href="/offers" className="font-medium hover:text-[#FF9933] transition-colors text-black">
                Offers
              </Link>
              <Link href="/about" className="font-medium hover:text-[#FF9933] transition-colors text-black">
                About Us
              </Link>
              <Link href="/contact" className="font-medium hover:text-[#FF9933] transition-colors text-black">
                Contact
              </Link>
              {loggedInUser && <span className="text-[#4361EE]">Welcome, {loggedInUser}!</span>}
              {!loggedInUser && (
                <Link href="/login">
                  <Button className="w-full bg-[#4361EE] text-white hover:bg-[#4361EE]/90">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
