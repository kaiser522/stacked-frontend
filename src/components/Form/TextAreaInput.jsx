import { useState } from "react";

export default function TextAreaInput({
  id,
  label,
  name,
  placeholder = "",
  rows = 4,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  className = "",
  ...rest
}) {
  const textareaId = id || name;

  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const inputValue = e?.target?.value;
    setLocalValue(inputValue);
    if (onChange) onChange(inputValue);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={textareaId} className="mb-[5px] text-[var(--white)]">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        rows={rows}
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
