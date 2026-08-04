import { useState, useRef, useEffect } from "react";
import type { Cliente } from "../types";

interface UseClienteComboboxReturn {
  isOpen: boolean;
  searchValue: string;
  filteredClientes: Cliente[];
  selectedCliente: Cliente | null;
  inputRef: React.RefObject<HTMLInputElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleSearchChange: (value: string) => void;
  handleSelectCliente: (cliente: Cliente) => void;
  handleDesselect: () => void;
  handleCrearNuevo: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;
}

export const useClienteCombobox = (
  clientes: Cliente[],
  value: number | null,
  onChange: (clienteId: number | null) => void,
  onCrearNuevo: () => void,
): UseClienteComboboxReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCliente = clientes.find((c) => c.id === value) || null;

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre_cliente
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    setIsOpen(true);
  };

  const handleSelectCliente = (cliente: Cliente) => {
    onChange(cliente.id as number);
    setSearchValue("");
    setIsOpen(false);
  };

  const handleDesselect = () => {
    onChange(null);
    setSearchValue("");
    setIsOpen(false);
  };

  const handleCrearNuevo = () => {
    onCrearNuevo();
    setSearchValue("");
    setIsOpen(false);
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    searchValue,
    filteredClientes,
    selectedCliente,
    inputRef: inputRef as React.RefObject<HTMLInputElement>,
    dropdownRef: dropdownRef as React.RefObject<HTMLDivElement>,
    handleSearchChange,
    handleSelectCliente,
    handleDesselect,
    handleCrearNuevo,
    openDropdown,
    closeDropdown,
  };
};
