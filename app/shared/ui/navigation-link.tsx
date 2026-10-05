import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router";
import { useAnimatedClick } from "../lib/navigation/navigation.hooks";

export function Link(props: LinkProps) {
  const onClick = useAnimatedClick(props);
  return <RouterLink viewTransition={false} {...props} onClick={onClick} />;
}

export function NavLink(props: NavLinkProps) {
  const onClick = useAnimatedClick(props as LinkProps);
  return <RouterNavLink viewTransition={false} {...props} onClick={onClick} />;
}
