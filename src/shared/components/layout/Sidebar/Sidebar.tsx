import styles from "./Sidebar.module.css";
import { Logo } from "../Logo/Logo";
import { MainNav } from "../MainNav/MainNav";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <MainNav />
      <div className={styles["sidebar-footer"]}>
        © {new Date().getFullYear()} TTL &amp; SEM — engineering team
      </div>
    </aside>
  );
}
