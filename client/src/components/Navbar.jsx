import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userSlice";
import CustomButton from "./CustomButton";

function MenuList({ user, onClick }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  return (
    <div>
      <Menu as='div' className='inline-block text-left'>
        <div className='flex'>
          <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-[#1E293B] hover:bg-gray-50 transition-colors duration-200'>
            <div className='leading[80px] flex flex-col items-start'>
              <p className='text-sm font-semibold '>
                {user?.firstName ?? user?.name}
              </p>
              <span className='text-sm text-[#2563EB] '>
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            {user?.profileUrl ? (
              <img
                src={user?.profileUrl}
                alt='user profile'
                className='w-10 h-10 rounded-full object-cover '
              />
            ) : (
              <div className='w-10 h-10 rounded-full bg-[#2563EB] text-white text-lg flex items-center justify-center'>
                {user?.firstName?.slice(0, 1) || user?.name?.slice(0, 1)}
              </div>
            )}
            <BiChevronDown
              className='h-8 w-8 text-[#64748B]'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-150'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#E2E8F0]'>
            <div className='p-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-[#F1F5F9] text-[#1E293B]" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm transition-colors duration-200`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-[#2563EB]" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-[#F1F5F9] text-[#1E293B]" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-[#2563EB]" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative bg-white shadow-sm border-b border-[#E2E8F0] z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div className='flex items-center gap-3'>
            <img 
              src='https://media.edusanjal.com/__sized__/logos/ISMT-Logo-Edusanjal-thumbnail-200x200.png'
              alt='ISMT Logo'
              className='w-10 h-10 rounded-full'
            />
            <Link to='/' className='text-[#1E3A8A] font-bold text-xl'>
              ISMT <span className='text-[#2563EB]'>JobPortal</span>
            </Link>
          </div>

          <ul className='hidden lg:flex gap-10 text-base text-[#1E293B]'>
            <li>
              <Link to='/' className='hover:text-[#2563EB] transition-colors duration-200 font-medium'>Find Job</Link>
            </li>
            <li>
              <Link to='/companies' className='hover:text-[#2563EB] transition-colors duration-200 font-medium'>Companies</Link>
            </li>
            <li>
              <Link
                to={
                  user?.accountType === "seeker"
                    ? "/applications"
                    : "/upload-job"
                }
                className='hover:text-[#2563EB] transition-colors duration-200 font-medium'
              >
                {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
              </Link>
            </li>
            <li>
              <Link to='/about-us' className='hover:text-[#2563EB] transition-colors duration-200 font-medium'>About</Link>
            </li>
          </ul>

          <div className='hidden lg:block'>
            {!user?.token ? (
              <a href='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles='bg-[#2563EB] text-white py-2 px-6 rounded-lg hover:bg-[#1E3A8A] transition-all duration-200 font-medium shadow-sm hover:shadow-md'
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>

          <button
            className='block lg:hidden text-[#1E293B]'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-white shadow-lg border-b border-[#E2E8F0]" : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-4 py-5`}
        >
          <Link to='/' onClick={handleCloseNavbar} className='text-[#1E293B] hover:text-[#2563EB] transition-colors duration-200 font-medium py-2'>
            Find Job
          </Link>
          <Link to='/companies' onClick={handleCloseNavbar} className='text-[#1E293B] hover:text-[#2563EB] transition-colors duration-200 font-medium py-2'>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType === "seeker" ? "applications" : "upload-job"
            }
            className='text-[#1E293B] hover:text-[#2563EB] transition-colors duration-200 font-medium py-2'
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar} className='text-[#1E293B] hover:text-[#2563EB] transition-colors duration-200 font-medium py-2'>
            About
          </Link>

          <div className='w-full py-4'>
            {!user?.token ? (
              <a href='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles={`bg-[#2563EB] text-white py-2 px-6 rounded-lg hover:bg-[#1E3A8A] transition-all duration-200 font-medium w-full text-center`}
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;