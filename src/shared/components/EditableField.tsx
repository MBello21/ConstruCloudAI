import React from "react";

interface EditableFieldProps {
  label: string;
  value: string | number;
  displayValue?: string;
  type?: "text" | "number" | "textarea";
  isEditing: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  displayValue,
  type = "text",
  isEditing,
  onToggle,
  onChange,
  onBlur,
}) => {
  const display = displayValue ?? value ?? "";

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
        {label}
      </label>
      {isEditing ? (
        type === "textarea" ? (
          <textarea
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            autoFocus
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        ) : (
          <input
            type={type}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            autoFocus
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        )
      ) : (
        <p
          onClick={onToggle}
          className={`text-gray-900 cursor-pointer hover:text-blue-950 transition-colors ${
            type === "textarea" ? "whitespace-pre-wrap" : ""
          }`}
        >
          {display}
        </p>
      )}
    </div>
  );
};

export default EditableField;
