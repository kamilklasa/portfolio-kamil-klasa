import { isGamingPath } from "~/entities/project";
import { Link, useLocation } from "react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Arrow } from "~/shared/ui/icons";
import { profile } from "~/shared/config/profile";
import { useMobileMenu } from "../model/mobile-menu.hooks";
import { navigationItems } from "../model/navigation-items";

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuIcon({
  open,
  enter = false,
}: {
  open: boolean;
  enter?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <>
      <motion.span
        aria-hidden="true"
        initial={enter ? { y: 0, rotate: 0 } : false}
        animate={{ y: open ? 3 : 0, rotate: open ? 45 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease }}
      />
      <motion.span
        aria-hidden="true"
        initial={enter ? { y: 0, rotate: 0 } : false}
        animate={{ y: open ? -3 : 0, rotate: open ? -45 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease }}
      />
    </>
  );
}

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { dialog, selectRoute, completeClose } = useMobileMenu(open, onClose);
  const location = useLocation();
  const reduced = useReducedMotion();

  const panel: Variants = {
    open: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0% round 26px)",
      transition: { duration: reduced ? 0 : 0.45, ease },
    },
    closed: {
      opacity: 0,
      y: reduced ? 0 : -24,
      clipPath: "inset(0% 0% 0% 0% round 26px)",
    },
    closing: {
      opacity: reduced ? 0 : 1,
      y: 0,
      clipPath: reduced
        ? "inset(0% 0% 0% 0% round 26px)"
        : "inset(0% 0% 100% 0% round 26px)",
      transition: {
        duration: reduced ? 0 : 0.38,
        delay: reduced ? 0 : 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  const label: Variants = {
    open: (index: number) => ({
      y: "0%",
      transition: {
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : 0.12 + index * 0.075,
        ease,
      },
    }),
    closed: { y: reduced ? "0%" : "115%" },
    closing: (index: number) => ({
      y: reduced ? "0%" : "-115%",
      transition: {
        duration: reduced ? 0 : 0.28,
        delay: reduced ? 0 : (navigationItems.length - 1 - index) * 0.025,
        ease: [0.4, 0, 1, 1],
      },
    }),
  };
  const row: Variants = {
    open: (index: number) => ({
      opacity: 1,
      transition: {
        duration: reduced ? 0 : 0.35,
        delay: reduced ? 0 : 0.12 + index * 0.075,
      },
    }),
    closed: { opacity: 0 },
    closing: (index: number) => ({
      opacity: 0,
      transition: {
        duration: reduced ? 0 : 0.18,
        delay: reduced
          ? 0
          : 0.15 + Math.max(0, navigationItems.length - 1 - index) * 0.025,
        ease,
      },
    }),
  };

  return (
    <AnimatePresence onExitComplete={completeClose}>
      {open && (
        <motion.dialog
          key="mobile-menu"
          ref={dialog}
          id="mobile-navigation"
          className="mobile-menu"
          aria-labelledby="mobile-menu-title"
          data-lenis-prevent
          variants={panel}
          initial="closed"
          animate="open"
          exit="closing"
          onAnimationStart={(definition) => {
            if (dialog.current)
              dialog.current.dataset.closing = String(definition === "closing");
          }}
          onAnimationComplete={(definition) => {
            if (definition === "closing") dialog.current?.close();
          }}
          onCancel={(event) => {
            event.preventDefault();
            onClose();
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              onClose();
          }}
        >
          <motion.div className="mobile-menu-header" variants={row} custom={3}>
            <span id="mobile-menu-title">Menu</span>
            <button
              className="mobile-menu-close"
              type="button"
              autoFocus
              aria-label="Zamknij menu"
              onClick={onClose}
            >
              <MenuIcon open enter />
            </button>
          </motion.div>
          <nav aria-label="Nawigacja mobilna">
            <ul className="mobile-menu-links">
              {navigationItems.map(({ label: text, to }, index) => (
                <motion.li key={to} custom={index} variants={row}>
                  <Link
                    to={to}
                    className="mobile-menu-link"
                    aria-current={
                      `${location.pathname}${location.hash}` === to ||
                      (to === "/gaming" && isGamingPath(location.pathname))
                        ? "page"
                        : undefined
                    }
                    onClick={(event) => selectRoute(event, to)}
                  >
                    <span className="mobile-menu-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="mobile-menu-label">
                      <motion.span custom={index} variants={label}>
                        {text}
                      </motion.span>
                    </span>
                    <Arrow diagonal />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="mobile-menu-contact"
            variants={row}
            custom={navigationItems.length}
          >
            <span>Porozmawiajmy o Twoim projekcie.</span>
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <Arrow diagonal />
            </a>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
