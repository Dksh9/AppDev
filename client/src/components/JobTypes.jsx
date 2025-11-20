import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const types = ["Full-Time", "Part-Time", "Contract", "Intern"];

export default function JobTypes({ jobTitle, setJobTitle }) {
  return (
    <div className='w-full'>
      <Listbox value={jobTitle} onChange={setJobTitle}>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] focus:ring-opacity-20 transition-all duration-200 sm:text-sm'>
            <span className='block truncate text-[#1E293B]'>{jobTitle}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                className='h-5 w-5 text-[#64748B]'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[#E2E8F0]'>
              {types.map((type, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#F1F5F9] text-[#1E293B]" : "text-gray-900"
                    } transition-colors duration-150`
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium text-[#2563EB]" : "font-normal"
                        }`}
                      >
                        {type}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#2563EB]'>
                          <BsCheck2 className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}