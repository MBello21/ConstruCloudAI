const BotonesFormulario: React.FC = () => {
  return (
    <div className="flex justify-end gap-3">
      <button className="px-4 py-2 border border-slate-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none  transition-colors duration-200">
        Cancelar
      </button>
      <button className="px-4 py-2 bg-blue-950 text-white rounded-md font-medium text-sm hover:bg-blue-900 focus:outline-none transition-colors duration-200">
        Guardar presupuesto
      </button>
    </div>
  );
};

export default BotonesFormulario;
