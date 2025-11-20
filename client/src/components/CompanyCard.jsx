import React from "react";
import { Link } from "react-router-dom";

const noLogo =
  "https://static.vecteezy.com/system/resources/previews/020/846/679/non_2x/job-posting-icon-design-free-vector.jpg";

const CompanyCard = ({ cmp }) => {
  return (
    <div className='w-full h-16 flex gap-4 items-center justify-between bg-white shadow-sm rounded-lg border border-[#E2E8F0] hover:shadow-md hover:border-[#2563EB] transition-all duration-200'>
      <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl || noLogo}
            alt={cmp?.name}
            className='w-10 md:w-12 h-10 md:h-12 rounded-lg border border-[#E2E8F0] object-cover'
          />
        </Link>
        <div className='h-full flex flex-col justify-center'>
          <Link
            to={`/company-profile/${cmp?._id}`}
            className='text-base md:text-lg font-semibold text-[#1E293B] truncate hover:text-[#2563EB] transition-colors duration-200'
          >
            {cmp?.name}
          </Link>
          <span className='text-sm text-[#64748B]'>{cmp?.email}</span>
        </div>
      </div>

      <div className='hidden w-1/4 h-full md:flex items-center'>
        <p className='text-sm text-[#64748B]'>{cmp?.location}</p>
      </div>

      <div className='w-1/4 h-full flex flex-col items-center justify-center'>
        <p className='text-[#2563EB] font-semibold text-lg'>{cmp?.jobPosts?.length}</p>
        <span className='text-xs text-[#64748B]'>
          Jobs Posted
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;