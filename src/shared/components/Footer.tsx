import { year } from "../helpers/year-footer.helpers";

export const Footer = () => {
  return (
    <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-center">
      <p className="text-sm text-gray-400">
        © {year} ConstruCloud AI. Todos los derechos reservados.
      </p>
    </footer>
  );
};
