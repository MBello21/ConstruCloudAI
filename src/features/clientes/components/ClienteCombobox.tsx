import { Search, X, Plus } from "lucide-react";
import type { ClienteComboboxProps } from "../../../shared/types";
import { useClienteCombobox } from "../hooks/useClienteCombobox";

const ClienteCombobox: React.FC<ClienteComboboxProps> = ({
  clientes,
  value,
  onChange,
  onCrearNuevo,
  placeholder = "Seleccionar cliente...",
}) => {
  const {
    isOpen,
    searchValue,
    filteredClientes,
    selectedCliente,
    inputRef,
    dropdownRef,
    handleSearchChange,
    handleSelectCliente,
    handleDesselect,
    handleCrearNuevo,
    openDropdown,
  } = useClienteCombobox(clientes, value, onChange, onCrearNuevo);

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">
          <Search className="w-4 h-4" />
        </div>

        {selectedCliente && !isOpen ? (
          <div
            onClick={() => {
              openDropdown();
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="flex items-center justify-between pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-white cursor-pointer hover:border-blue-950 transition-colors"
          >
            <span className="text-gray-900">{selectedCliente.nombre_cliente}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDesselect();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={openDropdown}
            placeholder={placeholder}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
          />
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
        >
          {filteredClientes.length > 0 ? (
            <>
              {filteredClientes.slice(0, 5).map((cliente) => (
                <button
                  key={cliente.id}
                  onClick={() => handleSelectCliente(cliente)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 border-b border-gray-100 last:border-b-0"
                >
                  {cliente.nombre_cliente}
                </button>
              ))}
            </>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              {searchValue
                ? "No se encontraron clientes"
                : "Empieza a escribir para buscar..."}
            </div>
          )}

          <button
            onClick={handleCrearNuevo}
            className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors text-sm text-blue-950 font-medium border-t border-gray-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Crear nuevo cliente
          </button>
        </div>
      )}
    </div>
  );
};

export default ClienteCombobox;
