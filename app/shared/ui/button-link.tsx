import type { ComponentPropsWithRef } from "react";
import type { LinkProps } from "react-router";
import { ButtonLabel } from "./button-label";
import { Arrow } from "./icons";
import { Link } from "./navigation-link";

export type ButtonLinkProps = {
  children: string;
  variant?: "dark" | "light";
  arrow?: boolean;
} & (
  | (Omit<LinkProps, "children"> & { href?: never })
  | (Omit<ComponentPropsWithRef<"a">, "children"> & {
      href: string;
      to?: never;
    })
);

export function ButtonLink({
  children,
  variant = "dark",
  arrow = false,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = ["button", `button-${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <ButtonLabel>{children}</ButtonLabel>
      {arrow && <Arrow diagonal />}
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        {...props}
        className={classes}
        rel={
          props.rel ??
          (props.target === "_blank" ? "noopener noreferrer" : undefined)
        }
      >
        {content}
      </a>
    );
  }

  return (
    <Link {...props} className={classes}>
      {content}
    </Link>
  );
}
