import type { ReactNode } from "react";

interface CampoEditableProps {
  tipo: "text" | "textarea" | "number" | "select";
  valor: string | number;
  isEditing: boolean;
  onToggleEdit: () => void;
  handleChange: (valor: string | number) => void;
  handleBlur: () => void;
  opciones?: string[];
  children?: ReactNode;
  className?: string;
  inputClassName?: string;
}

const CampoEditable: React.FC<CampoEditableProps> = ({
  tipo,
  valor,
  isEditing,
  onToggleEdit,
  handleChange,
  handleBlur,
  opciones = [],
  children,
  className = "",
  inputClassName = "px-2 py-1 border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950",
}) => {
  if (isEditing) {
    if (tipo === "textarea") {
      return (
        <textarea
          value={valor}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className={`w-full ${inputClassName}`}
        />
      );
    }

    if (tipo === "select") {
      return (
        <select
          value={valor}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className={inputClassName}
        >
          {opciones.map((opcion) => (
            <option key={opcion}>{opcion}</option>
          ))}
        </select>
      );
    }

    if (tipo === "number") {
      return (
        <input
          type="number"
          value={valor}
          onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
          onBlur={handleBlur}
          autoFocus
          className={`w-full ${inputClassName}`}
        />
      );
    }

    return (
      <input
        type="text"
        value={valor}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className={inputClassName}
      />
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onToggleEdit();
      }}
      className={`cursor-pointer hover:text-blue-950 transition-colors ${className}`}
    >
      {children}
    </span>
  );
};

export default CampoEditable;
