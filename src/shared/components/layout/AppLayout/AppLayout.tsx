import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.css";
import { LoggerFormStateProvider } from "../../../context/addLoggerForm/loggerFormStateProvider";

export function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <LoggerFormStateProvider>
          <Outlet />
        </LoggerFormStateProvider>
      </main>
    </div>
  );
}
