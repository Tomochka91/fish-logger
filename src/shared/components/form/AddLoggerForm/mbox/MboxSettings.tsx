import { Box } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { SettingsTab, SettingsTabs } from "../../../ui/tab/TabStyled";
import { DBWriterTab } from "../tabSettings/DBWriterTab";
import { ComPortTab } from "../tabSettings/ComPortTab";
import { ProcessingTab } from "../tabSettings/ProcessingTab";
import { CounterTab } from "../tabSettings/CounterTab";
import { MissDefaultTab } from "../tabSettings/MissDefaultTab";

export function MboxSettings() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_e: SyntheticEvent, tabValue: number) => {
    setTab(tabValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <SettingsTabs value={tab} onChange={handleTabChange}>
        <SettingsTab label="com-port" />
        <SettingsTab label="counter" />
        <SettingsTab label="processing" />
        <SettingsTab label="db-writer" />
        <SettingsTab label="miss default" />
      </SettingsTabs>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr min-content 1fr",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <Box sx={{ display: tab === 0 ? "contents" : "none" }}>
          <ComPortTab fieldPrefix="mbox" />
        </Box>

        <Box sx={{ display: tab === 1 ? "contents" : "none" }}>
          <CounterTab />
        </Box>

        <Box sx={{ display: tab === 2 ? "contents" : "none" }}>
          <ProcessingTab />
        </Box>

        <Box sx={{ display: tab === 3 ? "contents" : "none" }}>
          <DBWriterTab />
        </Box>

        <Box sx={{ display: tab === 4 ? "contents" : "none" }}>
          <MissDefaultTab />
        </Box>
      </Box>
    </Box>
  );
}
