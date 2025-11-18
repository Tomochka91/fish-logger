import styles from "./HomePage.module.css";
import fishIcon from "../../shared/icons/fish.svg";

export function HomePage() {
  return (
    <section className={styles.wrapper}>
      <img src={fishIcon} alt="Fish image" className={styles.image} />
      <h1 className={styles.title}>
        Lo<span className={styles.accent}>g</span>
        <span className={styles.accent}>g</span>er
      </h1>
    </section>
  );
}
