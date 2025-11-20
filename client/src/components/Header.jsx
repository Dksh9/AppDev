import React from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { popularSearch } from "../utils/data";
import CustomButton from "./CustomButton";

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type='text'
        className='w-full md:w-64 p-2 outline-none bg-transparent text-base text-[#1E293B] placeholder-[#64748B]'
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className='hidden md:flex text-[#94A3B8] text-xl cursor-pointer hover:text-[#64748B] transition-colors duration-200'
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className='bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]'>
      <div
        className={`container mx-auto px-5 ${
          type ? "h-[500px]" : "h-[350px]"
        } flex items-center relative`}
      >
        <div className='w-full z-10'>
          <div className='mb-8'>
            <p className='text-[#1E3A8A] font-bold text-4xl'>{title}</p>
            <p className='text-[#64748B] text-lg mt-2'>Find your dream job at ISMT College</p>
          </div>

          <div className='w-full flex items-center justify-around bg-white px-4 md:px-6 py-3 md:py-4 shadow-lg rounded-xl border border-[#E2E8F0]'>
            <SearchInput
              placeholder='Job Title or Keywords'
              icon={<AiOutlineSearch className='text-[#64748B] text-xl' />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder='Add Country or City'
              icon={<CiLocationOn className='text-[#64748B] text-xl' />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title='Search'
                containerStyles={
                  "text-white py-2 md:py-2 px-6 md:px-8 focus:outline-none bg-[#2563EB] rounded-lg text-sm md:text-base hover:bg-[#1E3A8A] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                }
              />
            </div>
          </div>

          {type && (
            <div className='w-full lg:1/2 flex flex-wrap gap-3 md:gap-4 py-10 md:py-14'>
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className='bg-white text-[#2563EB] py-2 px-4 rounded-lg text-sm md:text-base hover:bg-[#2563EB] hover:text-white transition-all duration-200 cursor-pointer border border-[#E2E8F0] shadow-sm'
                >
                  {search}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='w-1/3 h-full absolute top-24 md:-top-6 lg:-top-14 right-16 2xl:right-[18rem]' >
          <img 
            src='https://media.edusanjal.com/u/sunderland-ismt-partnership.png' 
            className='object-contain mt-20 rounded-lg shadow-xl' 
            alt='ISMT Campus'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;