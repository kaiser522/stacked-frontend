import React from "react";
import DatePickerLib from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";


export default function DatePicker({ label, selected, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <DatePickerLib
          selected={selected}
          onChange={onChange}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholderText="Select a date"
        />
        <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
