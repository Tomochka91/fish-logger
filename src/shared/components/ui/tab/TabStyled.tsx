import { styled, Tabs, Tab } from "@mui/material";

export const SettingsTabs = styled(Tabs)({
  minHeight: 0,
  "& .MuiTabs-flexContainer": {
    gap: "var(--gap-standart)",
  },
  "& .MuiTabs-indicator": {
    height: "0.2rem",
    borderRadius: "var(--border-radius-main)",
    backgroundColor: "var(--color-mint)",
  },
});

export const SettingsTab = styled(Tab)({
  textTransform: "none",
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  minHeight: 0,
  padding: "0.4rem 1rem",
  borderRadius: "var(--border-radius-main)",
  alignSelf: "flex-start",
  color: "var(--color-gunmetal)",
  "&.Mui-selected": {
    backgroundColor: "var(--color-mint-cream)",
    color: "var(--color-indian-red)",
  },
});
