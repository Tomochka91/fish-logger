import { AddLoggerForm } from "../../shared/components/form/AddLoggerForm/AddLoggerForm";
import styles from "./AddPage.module.css";

export function AddPage() {
  return (
    <section className={styles.section}>
      <h2>Add logger</h2>
      <AddLoggerForm />
    </section>
  );
}
