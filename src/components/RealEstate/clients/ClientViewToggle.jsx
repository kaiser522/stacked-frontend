import Button  from "./Button";
import { List, LayoutGrid, Calendar } from "lucide-react";

export default function ClientViewToggle({ view, setView }) {
  const buttons = [
    { label: "List", value: "list", icon: <List className="w-4 h-4 mr-1" /> },
    {
      label: "Board",
      value: "board",
      icon: <LayoutGrid className="w-4 h-4 mr-1" />,
    },
    {
      label: "Calendar",
      value: "calendar",
      icon: <Calendar className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      {buttons.map(({ label, value, icon }) => (
        <Button
          key={value}
          variant={view === value ? "default" : "ghost"}
          onClick={() => setView(value)}
          className={`${
            view === value
              ? "text-[var(--primary-color)] bg-[var(--medium-dark)]"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {icon} {label}
        </Button>
      ))}
    </div>
  );
}
