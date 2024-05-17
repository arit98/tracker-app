"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BsFire } from "react-icons/bs";
import { MdFitnessCenter } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { PiWaveSawtoothBold } from "react-icons/pi";

const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const getIconStyle = (path: string) => {
    return pathname === path ? 'text-orange-500' : 'text-[#6C6C6C]';
  };

  return (
    <div className='fixed bottom-0 w-full flex items-center justify-between bg-[#242424] h-12 shadow-md'>
      <div 
        className={`w-full flex items-center justify-center cursor-pointer ${getIconStyle('/')}`}
        onClick={() => handleNavigation('/')}
      >
        <BsFire className='text-xl' />
      </div>
      <div 
        className={`w-full flex items-center justify-center cursor-pointer ${getIconStyle('/fitness')}`}
        onClick={() => handleNavigation('/fitness')}
      >
        <MdFitnessCenter className='text-xl' />
      </div>
      <div 
        className={`w-full flex items-center justify-center cursor-pointer ${getIconStyle('/food')}`}
        onClick={() => handleNavigation('/food')}
      >
        <IoFastFood className='text-xl' />
      </div>
      <div 
        className={`w-full flex items-center justify-center cursor-pointer ${getIconStyle('/wave')}`}
        onClick={() => handleNavigation('/wave')}
      >
        <PiWaveSawtoothBold className='text-2xl' />
      </div>
    </div>
  );
};

export default BottomBar;
