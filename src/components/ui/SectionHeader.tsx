import type { SectionHeaderConfig } from "../../types";

export const SectionHeader = ({ title,section,subtitle }: SectionHeaderConfig) => {
  return (
    <div>
      <h2 className="font-sans text-sm text-neutral-500 font-semibold">
        {title}
      </h2>
      <h2 className="font-sans font-bold text-3xl">{section}</h2>
      <p className="text-neutral-400">{subtitle}</p>
    </div>
  );
};
