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
        width: "50%",
        mb: "var(--margin-medium)",
        p: "var(--padding-mini)",
        borderRadius: "var(--border-radius-medium)",
        border: "var(--border-standart)",
        boxShadow: 1,
        fontFamily: "var(--secondary-font)",
      }}
    >
      <SettingsTabs value={tab} onChange={handleTabChange}>
        <SettingsTab label="com-port" />
        <SettingsTab label="framer" />
      </SettingsTabs>

      {tab === 0 && <ComPortTab />}

      {tab === 1 && <FramerTab />}
    </Box>
  );
}
