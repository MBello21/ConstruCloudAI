export const Navbar = () => {
  return (
    <nav className="h-16 flex justify-between items-center px-6 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-3 border-gray-300 h-full w-full justify-end">
        <div className="flex justify-center items-center gap-3 border-l border-gray-300 w-50 ">
          <div className="bg-blue-950 w-10 h-10 flex justify-center items-center rounded-full shadow-sm border-r border-black">
            <h3 className="text-h5 font-semibold text-white">MG</h3>
          </div>
          <div>
            <h3 className="text-h6 font-semibold text-gray-900">
              Miguel García
            </h3>
            <p className="text-xs">Panel de Gestión</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
