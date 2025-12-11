import { Box } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { SettingsTab, SettingsTabs } from "../../../ui/tab/TabStyled";
import { ComPortTab } from "../tabSettings/ComPortTab";
import { FramerTab } from "../tabSettings/FramerTab";
import { DBWriterTab } from "../tabSettings/DBWriterTab";

export function EasySerialSettings() {
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
        <SettingsTab label="framer/parser" />
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
        {tab === 0 && <ComPortTab fieldPrefix="easy_serial" />}

        {tab === 1 && <FramerTab />}

        {tab === 2 && <DBWriterTab />}
      </Box>
    </Box>
  );
}
