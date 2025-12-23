import { Box } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { SettingsTab, SettingsTabs } from "../../../ui/tab/TabStyled";
import { PollIntervalTab } from "../tabSettings/PollIntervalTab";
import { SlavesTab } from "../tabSettings/SlavesTab/SlavesTab";
import { DBWriterTab } from "../tabSettings/DBWriterTab";
import { HostTab } from "../tabSettings/HostTab";

export function ModbusTcpSettings() {
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
        <SettingsTab label="host" />
        <SettingsTab label="poll interval" />
        <SettingsTab label="slaves" />
        <SettingsTab label="db-writer" />
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
          <HostTab />
        </Box>

        <Box sx={{ display: tab === 1 ? "contents" : "none" }}>
          <PollIntervalTab fieldPrefix="modbus_tcp" />
        </Box>

        <Box sx={{ display: tab === 2 ? "contents" : "none" }}>
          <SlavesTab fieldPrefix="modbus_tcp" />
        </Box>

        <Box sx={{ display: tab === 3 ? "contents" : "none" }}>
          <DBWriterTab />
        </Box>
      </Box>
    </Box>
  );
}
