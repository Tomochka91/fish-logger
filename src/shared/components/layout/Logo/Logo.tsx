import clsx from "clsx";
import styles from "./Logo.module.css";
import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/">
      <div className={styles.container}>
        <span className={clsx(styles.logo, styles.accent)}>Fish</span>
        <span className={clsx(styles.logo, styles.secondary)}>Logger</span>
      </div>
    </Link>
  );
}
