import { Box } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { SettingsTab, SettingsTabs } from "../../../ui/tab/TabStyled";
import { ComPortTab } from "../tabSettings/ComPortTab";
import { PollIntervalTab } from "../tabSettings/PollIntervalTab";
import { SlavesTab } from "../tabSettings/SlavesTab/SlavesTab";
import { DBWriterTab } from "../tabSettings/DBWriterTab";

export function ModbusRtuSettings() {
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
        {tab === 0 && <ComPortTab fieldPrefix="modbus_rtu" />}

        {tab === 1 && <PollIntervalTab />}

        {tab === 2 && <SlavesTab fieldPrefix="modbus_rtu" />}

        {tab === 3 && <DBWriterTab />}
      </Box>
    </Box>
  );
}
