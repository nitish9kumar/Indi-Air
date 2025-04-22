import React from "react";
import AirlineLogo from "./AirlineLogo";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1128] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <AirlineLogo className="mb-6" />
            <p className="text-white opacity-80 mb-6">
              Connecting India to the world with comfort, culture, and care.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Book a Flight
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Travel Information</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Baggage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Check-in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Special Assistance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Travel Insurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  Visa Requirements
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#FF9933] mt-1 mr-3" />
                <span className="text-white opacity-80">
                  IndiAir House, Indira Gandhi International Airport, New Delhi, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#FF9933] mr-3" />
                <span className="text-white opacity-80">+91 11 2222 3333</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#FF9933] mr-3" />
                <span className="text-white opacity-80">contact@indiair.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white opacity-60 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IndiAir. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="text-white opacity-60 text-sm hover:opacity-100 transition-opacity"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-white opacity-60 text-sm hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white opacity-60 text-sm hover:opacity-100 transition-opacity"
              >
                Cookies Policy
              </a>
              <a
                href="#"
                className="text-white opacity-60 text-sm hover:opacity-100 transition-opacity"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
