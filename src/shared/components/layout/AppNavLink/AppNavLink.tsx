import clsx from "clsx";
import { NavLink } from "react-router";
import styles from "./AppNavLink.module.css";

type AppNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function AppNavLink({ to, children }: AppNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
    >
      {children}
    </NavLink>
  );
}
