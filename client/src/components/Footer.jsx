import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data";
import CustomButton from "./CustomButton";
import TextInput from "./TextInput";

const Footer = () => {
  return (
    <footer className='text-white mt-20'>
      <div className='bg-[#1E293B]'>
        <div className='container px-5 py-16 mx-auto'>
          <div className='w-full flex flex-wrap gap-10 justify-between -mb-10 -px-4'>
            {footerLinks.map(({ id, title, links }) => (
              <div className='w-auto px-4' key={id + title}>
                <h2 className='font-semibold text-white tracking-widest text-sm mb-4'>
                  {title}
                </h2>

                <div className='mb-10 flex flex-col gap-3'>
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to='/'
                      className='text-[#94A3B8] text-sm hover:text-white transition-colors duration-200'
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-[#1E293B] border-t border-[#334155]'>
          <div className='container mx-auto px-5 pt-8 pb-6'>
            <p className='text-white text-lg font-semibold mb-4'>
              Stay Updated with Job Opportunities
            </p>

            <div className='w-full flex flex-col md:flex-row gap-4 items-center justify-between'>
              <div className='w-full md:w-2/4 lg:w-1/3 flex items-center justify-center md:justify-start gap-2'>
                <TextInput
                  styles='w-full flex-grow md:w-48 2xl:w-64 bg-white text-[#1E293B] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]'
                  type='email'
                  placeholder='Enter your email'
                />

                <CustomButton
                  title='Subscribe'
                  containerStyles={
                    "bg-[#2563EB] text-white px-6 py-3 text-sm rounded-lg hover:bg-[#1E3A8A] focus:outline-none transition-all duration-200 font-medium"
                  }
                />
              </div>

              <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto gap-4'>
                <a className='text-[#94A3B8] text-xl hover:text-white hover:scale-110 ease-in-out duration-300 transition-all cursor-pointer'>
                  <FaFacebookF />
                </a>
                <a className='text-[#94A3B8] text-xl hover:text-white hover:scale-110 ease-in-out duration-300 transition-all cursor-pointer'>
                  <FaTwitter />
                </a>
                <a className='text-[#94A3B8] text-xl hover:text-white hover:scale-110 ease-in-out duration-300 transition-all cursor-pointer'>
                  <FiInstagram />
                </a>
                <a className='text-[#94A3B8] text-xl hover:text-white hover:scale-110 ease-in-out duration-300 transition-all cursor-pointer'>
                  <FaLinkedinIn />
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className='bg-[#0F172A]'>
          <div className='container mx-auto py-6 px-5 flex flex-col md:flex-row gap-4 justify-between items-center'>
            <div className='flex items-center gap-3'>
              <img 
                src='https://media.edusanjal.com/__sized__/logos/ISMT-Logo-Edusanjal-thumbnail-200x200.png'
                alt='ISMT Logo'
                className='w-6 h-6 rounded-full'
              />
              <p className='text-[#94A3B8] text-sm text-center sm:text-left'>
                &copy; {new Date().getFullYear()} ISMT College —
                <a
                  href='https://www.ismt.edu.np/'
                  className='text-[#2563EB] ml-1 hover:text-[#3B82F6] transition-colors duration-200'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Kathmandu, Nepal
                </a>
              </p>
            </div>

            <span className='text-[#94A3B8] text-sm text-center md:text-right'>
              Connecting Talent with Opportunity
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;