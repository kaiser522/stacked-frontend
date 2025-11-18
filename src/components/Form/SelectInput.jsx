import { useState } from "react";

export default function SelectInput({
    id,
    label,
    name,
    options,
    value,
    onChange,
    disabled = false,
    className = '',
    ...rest
  }) {
    const selectId = id || name;


     const [localValue, setLocalValue] = useState(value || "");
    
      const handleChange = (e) => {
        const inputValue = e?.target?.value;
        setLocalValue(inputValue);
        if (onChange) onChange(inputValue);
      };
  
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={selectId} className="mb-[5px] text-[var(--white)]">
            {label}
          </label>
        )}
        <select
          id={selectId}
          name={name}
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className={
            `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-[var(--gray)] border-gray-300 text-[var(--white)] bg-[var(--dark-bg)]` +
            `${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ` +
            className
          }
          {...rest}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  