import styles from "./MainNav.module.css";
import {
  BsFileEarmarkPlus,
  BsReverseListColumnsReverse,
  BsDatabaseGear,
  BsBoxes,
  BsBug,
} from "react-icons/bs";
import { AppNavLink } from "../AppNavLink/AppNavLink";

export function MainNav() {
  return (
    <nav>
      <ul className={styles["nav-list"]}>
        <li>
          <AppNavLink to="/add">
            <BsFileEarmarkPlus />
            <span className={styles.caption}>Add Logger</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink to="/loggers">
            <BsReverseListColumnsReverse />
            <span className={styles.caption}>Loggers</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink to="/connection">
            <BsDatabaseGear />
            <span className={styles.caption}>DB Connection</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink to="/statistics">
            <BsBoxes />
            <span className={styles.caption}>Statistics</span>
          </AppNavLink>
        </li>
        <li>
          <AppNavLink to="/debug">
            <BsBug />
            <span className={styles.caption}>Debug</span>
          </AppNavLink>
        </li>
      </ul>
    </nav>
  );
}
