export const Sidebar = () => {
  return (
    <aside className="flex flex-col border-r border-gray-300 h-full">
      <div className="flex items-center p-3 border-b border-gray-300 h-16 ">
        <div className="flex gap-3  h-full w-70.5 ">
          <div className="bg-blue-950 w-10 h-10 flex justify-center items-center rounded-lg shadow-sm">
            <i className="fa-solid fa-helmet-safety text-white text-lg"></i>
          </div>
          <div>
            <h3 className="text-h5 font-semibold text-gray-900">
              ConstruCloud AI
            </h3>
            <p className="text-xs">Panel de Gestión</p>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </aside>
  );
};
