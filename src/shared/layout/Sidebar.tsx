import { NavLink } from "react-router";
import { NAVEGATION } from "../constants/sidebar-data.constant";
import { HardHat, LogOut } from "lucide-react";
import { SidebarSkeleton } from "../components/skeletons";
import { useGlobalLoading } from "../hooks";
import { useAuth } from "../../features/auth/context/AuthContext";
export const Sidebar = () => {
  const { isLoading: globalIsLoading } = useGlobalLoading();
  const { user, logout } = useAuth();
  return (
    <aside className="flex flex-col border-r border-slate-200 max-h-full h-full">
      {globalIsLoading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <div className="flex items-center p-3 border-b border-slate-200 h-14 ">
            <div className="flex items-center gap-3 h-full w-70.5 ">
              <div className="flex justify-center items-center bg-blue-950 w-8 h-8 rounded-lg shadow-sm">
                <HardHat className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  ConstruCloud AI
                </h3>
                <p className="text-xs text-slate-600">Panel de Gestión</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <h2 className="mb-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Navegación
            </h2>
            <ul className="space-y-2">
              {NAVEGATION.map((item) => {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-blue-950 text-white shadow-md"
                            : "text-slate-700 hover:bg-neutral-300 active:bg-slate-200"
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="text-[15px]">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-between px-3 py-4 border-t border-slate-200 h-16">
            <div className="flex items-center gap-4 w-full">
              <div className="bg-blue-950 w-10 h-10 flex justify-center items-center rounded-full shadow-sm border-r border-black">
                <h3 className="text-h5 font-semibold text-white">
                  {user?.nombre_completo
                    ? user.nombre_completo
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </h3>
              </div>
              <p className="text-center text-sm text-slate-600">
                {user?.email}
              </p>
            </div>
            <button
              className="flex items-center gap-3 px-2 py-2 text-slate-700 rounded-md font-medium transition-all duration-200 hover:bg-slate-200 hover:shadow-md "
              onClick={logout}
            >
              <LogOut />
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
