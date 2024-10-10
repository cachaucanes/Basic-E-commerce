import React from "react";

const InputForm = ({ label, name, value, handleChange, type='text', icon=false }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className={`mt-2 ${icon && 'relative'}`}>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          onChange={handleChange}
        />
        {icon && icon}
      </div>
    </>
  );
};

export { InputForm };
