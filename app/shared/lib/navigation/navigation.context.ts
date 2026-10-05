import { createContext } from "react";
import type { NavigateOptions, To } from "react-router";

export type PageNavigate = (
  to: To,
  options?: NavigateOptions,
) => void | Promise<void>;

export const NavigationContext = createContext<PageNavigate | null>(null);
