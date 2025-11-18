import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { MdLock } from "react-icons/md";

const PasswordInput = ({ id, label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  
  const handleInputChange = (e) => {
    const {value} = e?.target;
    setInputValue(value);
    if(onChange) onChange(value);
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label || "Password"}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdLock size={18} className="text-gray-400" />
        </div>
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={inputValue}
          onChange={handleInputChange}
          className="pl-10 pr-10 block w-full rounded-md py-2 px-4 bg-[#324250] border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="••••••••"
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
        >
          {showPassword ? <IoMdEyeOff size={18} /> : <IoEye size={18} />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
