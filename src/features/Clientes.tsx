import { useLocation } from "react-router";
import { SectionHeader } from "../components/ui/SectionHeader";

export const Clientes = () => {
  const { pathname } = useLocation();
  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      <SectionHeader title="GESTIÓN" section="Clientes" pathname={pathname} />
    </section>
  );
};
