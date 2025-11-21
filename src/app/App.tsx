import { Route, Routes } from "react-router";
import { AppLayout } from "../shared/components/layout/AppLayout/AppLayout";
import "./global.css";
import { HomePage } from "../pages/HomePage/HomePage";
import { AddPage } from "../pages/AddPage/AddPage";
import { LoggersPage } from "../pages/LoggersPage/LoggersPage";
import { DBConnectionPage } from "../pages/DBConnectionPage/DBConnectionPage";
import { StatisticsPage } from "../pages/StatisticsPage/StatisticsPage";
import { DebugPage } from "../pages/DebugPage/DebugPage";
import { DebugProvider } from "../shared/context/debug/debugProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <DebugProvider>
      <div className="frame">
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"/add"} element={<AddPage />} />
            <Route path={"/loggers"} element={<LoggersPage />} />
            <Route path={"/connection"} element={<DBConnectionPage />} />
            <Route path={"/statistics"} element={<StatisticsPage />} />
            <Route path={"/debug"} element={<DebugPage />} />
          </Route>
        </Routes>
      </div>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: { duration: 5000 },
          style: {
            fontFamily: "var(--main-font)",
            fontSize: "var(--medium-font-size)",
            maxWidth: "50rem",
            padding: "1.6rem 2.4rem",
            backgroundColor: "var(--color-lemon-chiffon)",
            color: "var(--color-blue-munsell)",
          },
        }}
      />
    </DebugProvider>
  );
}

export default App;
