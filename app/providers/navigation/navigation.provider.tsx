import type { ReactNode } from "react";
import { NavigationContext } from "~/shared/lib/navigation/navigation.context";
import { useNavigationTransition } from "./navigation.hooks";

export function NavigationProvider({ children }: { children: ReactNode }) {
  const { scope, navigatePage } = useNavigationTransition();
  return (
    <NavigationContext.Provider value={navigatePage}>
      <div ref={scope} className="site-shell" data-page-transition="idle">
        {children}
      </div>
    </NavigationContext.Provider>
  );
}
