import moment from "moment";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

const noLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/job-detail/${job?._id}`}
      className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-sm rounded-lg px-4 py-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#2563EB] transition-all duration-200'
    >
      <div className='w-full h-full flex flex-col justify-between'>
        <div className='flex gap-3'>
          <img
            src={job?.logo || noLogo}
            alt={job?.name}
            className='w-14 h-14 rounded-lg object-cover border border-[#E2E8F0]'
          />

          <div className='w-full h-16 flex flex-col justify-center'>
            <p className='w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5 text-[#1E293B]'>
              {job?.jobTitle}
            </p>
            <span className='flex gap-2 items-center text-[#64748B] text-sm'>
              <GoLocation className='text-[#64748B] text-sm' />
              {job?.location}
            </span>
          </div>
        </div>

        <div className='py-3'>
          <p className='text-sm text-[#64748B] leading-relaxed'>
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='bg-[#F1F5F9] text-[#1E293B] py-1 px-3 rounded font-medium text-sm border border-[#E2E8F0]'>
            {job?.jobType}
          </p>
          <span className='text-[#64748B] text-sm'>
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;