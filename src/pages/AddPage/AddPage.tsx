import { AddLoggerForm } from "../../shared/components/form/AddLoggerForm/AddLoggerForm";
import styles from "./AddPage.module.css";

export function AddPage() {
  return (
    <section className={styles.section}>
      <h2>Logger settings</h2>
      <AddLoggerForm />
    </section>
  );
}
