import React, { useState } from "react";

export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled = false,
  readOnly = false,
  name,
  className = "",
  ...rest
}) {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const inputValue = e?.target?.value;
    setLocalValue(inputValue);
    if (onChange) onChange(inputValue);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-[var(--white)]! mb-2">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        className={
          `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-[var(--gray)] border-gray-300 text-[var(--white)]` +
          `${disabled || readOnly ? "bg-gray-100 cursor-not-allowed" : ""} ` +
          className
        }
        {...rest}
      />
    </div>
  );
}
