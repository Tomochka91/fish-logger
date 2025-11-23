import { DBForm } from "../../shared/components/form/DBForm/DBForm";
import styles from "./DBConnectionPage.module.css";

export function DBConnectionPage() {
  return (
    <section className={styles.section}>
      <h2>SQL DataBase connection settings</h2>
      <DBForm />
    </section>
  );
}
