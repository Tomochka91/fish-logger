import { Route, Routes } from "react-router";
import { AppLayout } from "../shared/components/layout/AppLayout/AppLayout";
import "./global.css";
import { HomePage } from "../pages/HomePage/HomePage";
import { AddPage } from "../pages/AddPage/AddPage";
import { LoggersPage } from "../pages/LoggersPage/LoggersPage";
import { DBConnectionPage } from "../pages/DBConnectionPage/DBConnectionPage";
import { StatisticsPage } from "../pages/StatisticsPage/StatisticsPage";
import { DebugPage } from "../pages/DebugPage/DebugPage";

function App() {
  return (
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
  );
}

export default App;
