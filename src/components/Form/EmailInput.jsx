import React, { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";

const EmailInput = ({ id, label, name, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const { value } = e?.target;
    setInputValue(value);
    if (onChange) onChange(value);
  };
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label || "Email Address"}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdOutlineAlternateEmail size={18} className="text-gray-400" />
        </div>
        <input
          id={id}
          name={name}
          type="email"
          autoComplete="email"
          value={inputValue}
          onChange={handleInputChange}
          className="pl-10 block w-full rounded-md py-2 px-4 bg-[#324250] border-gray-600 focus:ring-teal-500 placeholder-gray-400 text-white focus:outline-none focus:ring-1"
          placeholder="admin@example.com"
        />
      </div>
    </div>
  );
};

export default EmailInput;
