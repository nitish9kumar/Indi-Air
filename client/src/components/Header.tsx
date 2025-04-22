import React, { useState, useEffect } from "react";
import AirlineLogo from "./AirlineLogo";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link } from "wouter";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-3"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <AirlineLogo />
              </a>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="font-medium hover:text-[#FF9933] transition-colors">Home</a>
            </Link>
            <Link href="/destinations">
              <a className="font-medium hover:text-[#FF9933] transition-colors">Destinations</a>
            </Link>
            <Link href="/offers">
              <a className="font-medium hover:text-[#FF9933] transition-colors">Offers</a>
            </Link>
            <Link href="/about">
              <a className="font-medium hover:text-[#FF9933] transition-colors">About Us</a>
            </Link>
            <Link href="/contact">
              <a className="font-medium hover:text-[#FF9933] transition-colors">Contact</a>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <a className="hidden md:flex text-[#4361EE] hover:text-[#FF9933] transition-colors">
                <User className="h-5 w-5" />
              </a>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="hidden md:inline-flex border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE] hover:text-white"
              >
                Login
              </Button>
            </Link>
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
              <Link href="/">
                <a className="font-medium hover:text-[#FF9933] transition-colors">Home</a>
              </Link>
              <Link href="/destinations">
                <a className="font-medium hover:text-[#FF9933] transition-colors">Destinations</a>
              </Link>
              <Link href="/offers">
                <a className="font-medium hover:text-[#FF9933] transition-colors">Offers</a>
              </Link>
              <Link href="/about">
                <a className="font-medium hover:text-[#FF9933] transition-colors">About Us</a>
              </Link>
              <Link href="/contact">
                <a className="font-medium hover:text-[#FF9933] transition-colors">Contact</a>
              </Link>
              <Link href="/login">
                <Button className="w-full bg-[#4361EE] text-white hover:bg-[#4361EE]/90">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
