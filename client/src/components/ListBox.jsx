import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  return (
    <div className='w-[8rem] md:w-[10rem]'>
      <Listbox value={sort} onChange={setSort}>
        <div className='relative mt-1'>
          <Listbox.Button
            className={
              "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-[#2563EB] focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-opacity-20 sm:text-sm border border-[#E2E8F0] transition-all duration-200"
            }
          >
            <span className='block truncate text-[#1E293B]'>{sort}</span>

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
              {options.map((op, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 transition-colors duration-150 ${
                      active ? "bg-[#F1F5F9] text-[#1E293B]" : "text-gray-900"
                    }`
                  }
                  value={op}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium text-[#2563EB]" : "font-normal"
                        }`}
                      >
                        {op}
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
};

export default ListBox;