import { useBlocker } from "react-router";

export const useUnsavedChangesGuard = (isDirty: boolean) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  return blocker;
};
