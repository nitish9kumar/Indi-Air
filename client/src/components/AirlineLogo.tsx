import React from "react";

interface AirlineLogoProps {
  className?: string;
}

const AirlineLogo: React.FC<AirlineLogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center mr-2">
        <span className="text-white font-bold text-lg">IA</span>
      </div>
      <span className="font-bold text-xl text-[#0A1128]">
        Indi<span className="text-[#FF9933]">Air</span>
      </span>
    </div>
  );
};

export default AirlineLogo;
