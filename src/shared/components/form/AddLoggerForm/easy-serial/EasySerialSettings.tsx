import { Box } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { SettingsTab, SettingsTabs } from "../../../ui/tab/TabStyled";
import { ComPortTab } from "../settings/ComPortTab";
import { FramerTab } from "../settings/FramerTab";

export function EasySerialSettings() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_e: SyntheticEvent, tabValue: number) => {
    setTab(tabValue);
  };

  return (
    <Box
      sx={{
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <SettingsTabs value={tab} onChange={handleTabChange}>
        <SettingsTab label="com-port" />
        <SettingsTab label="framer/parser" />
      </SettingsTabs>

      <Box sx={{ flex: 1, minHeight: 0, display: "flex" }}>
        {tab === 0 && <ComPortTab />}

        {tab === 1 && <FramerTab />}
      </Box>
    </Box>
  );
}
