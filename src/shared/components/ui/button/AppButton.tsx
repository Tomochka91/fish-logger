import { Button, type ButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const baseButtonSx: SxProps<Theme> = {
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  lineHeight: "var(--line-height-medium)",
  padding: "var(--padding-special-small)",
  borderRadius: "var(--border-radius-medium)",
  textTransform: "var(--text-uppercase)",
  gap: "var(--gap-standart)",
  color: "var(--color-gunmetal)",
  boxShadow: 2,
  border: "var(--border-standart)",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  "& .MuiButton-startIcon": {
    minWidth: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

type AppButtonProps = ButtonProps;

export function AppButton({ sx, ...rest }: AppButtonProps) {
  const mergedSx: SxProps<Theme> = {
    ...(baseButtonSx as object),
    ...(sx as object),
  };

  return <Button {...rest} sx={mergedSx} />;
}
