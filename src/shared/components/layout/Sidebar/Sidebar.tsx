import styles from "./Sidebar.module.css";
import { Logo } from "../Logo/Logo";
import { MainNav } from "../MainNav/MainNav";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <MainNav />
      <div className={styles["sidebar-footer"]}>
        <span>Fish Logger v1.0</span>
        <span>
          © {new Date().getFullYear()} TTL &amp; SEM — engineering team
        </span>
      </div>
    </aside>
  );
}
