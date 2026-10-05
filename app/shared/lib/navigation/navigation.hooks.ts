import { useContext, type MouseEvent } from "react";
import { useNavigate, useResolvedPath, type LinkProps } from "react-router";
import { NavigationContext, type PageNavigate } from "./navigation.context";

export function usePageNavigate(): PageNavigate {
  const navigation = useContext(NavigationContext);
  const fallback = useNavigate();
  return navigation ?? fallback;
}

export function useAnimatedClick(props: LinkProps) {
  const navigation = useContext(NavigationContext);
  const resolved = useResolvedPath(props.to, { relative: props.relative });

  return (event: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    if (
      !navigation ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.reloadDocument ||
      props.download ||
      (props.target && props.target !== "_self") ||
      event.currentTarget.origin !== window.location.origin
    )
      return;
    event.preventDefault();
    // Lenis nie uruchamia animacji kotwicy równolegle z nawigacją.
    event.stopPropagation();
    void navigation(resolved, {
      replace: props.replace,
      state: props.state,
      preventScrollReset: props.preventScrollReset,
    });
  };
}
