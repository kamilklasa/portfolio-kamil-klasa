import { useHeaderMenu } from "../model/header.hooks";
import { isGamingPath } from "~/entities/project";
import { MobileMenu, MenuIcon } from "./mobile-menu";
import { ButtonLabel } from "~/shared/ui/button-label";
import { Link, NavLink } from "~/shared/ui/navigation-link";
import { SocialIcon } from "~/shared/ui/icons";
import { profile } from "~/shared/config/profile";
import { navigationItems } from "../model/navigation-items";

export function Header() {
  const { open, setOpen, location } = useHeaderMenu();
  const socials = [
    { name: "Dribbble" as const, href: profile.dribbble },
    { name: "LinkedIn" as const, href: profile.linkedIn },
  ];
  return (
    <header className="header">
      <button
        className="menu-toggle icon-button"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon open={open} />
      </button>
      <nav id="navigation" className="navigation" aria-label="Główna nawigacja">
        {navigationItems.map(({ label, to }) =>
          to.includes("#") ? (
            <Link key={to} to={to}>
              {label}
            </Link>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={
                to === "/gaming"
                  ? `gaming-nav-link${isGamingPath(location.pathname) ? " active" : ""}`
                  : undefined
              }
            >
              {label}
            </NavLink>
          ),
        )}
      </nav>
      <div className="social-navigation" aria-label="Media społecznościowe">
        {socials.map(({ name, href }) =>
          href ? (
            <a
              key={name}
              className="social-link"
              href={href}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name={name} />
            </a>
          ) : (
            <span
              key={name}
              className="social-link"
              role="img"
              aria-label={name}
            >
              <SocialIcon name={name} />
            </span>
          ),
        )}
      </div>
      <Link to="/kontakt" className="contact-pill">
        <ButtonLabel>Kontakt</ButtonLabel>
      </Link>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
