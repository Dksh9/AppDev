import React from "react";

const TextInput = ({
  name,
  label,
  placeholder,
  type,
  register,
  error,
  styles,
}) => {
  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label
          htmlFor={name}
          className='text-sm font-medium text-[#1E293B] mb-2'
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register}
        className={`w-full px-4 py-3 border border-[#E2E8F0] rounded-lg bg-white text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200 ${styles}`}
      />
      {error && (
        <span className='text-xs text-red-500 mt-2'>{error}</span>
      )}
    </div>
  );
};

export default TextInput;