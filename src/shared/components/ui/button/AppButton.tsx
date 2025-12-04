import { Button, type ButtonProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const baseButtonSx: SxProps<Theme> = {
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  lineHeight: "var(--line-height-standart)",
  color: "var(--color-gunmetal)",
  padding: "var(--padding-special-small)",
  border: "var(--border-standart)",
  borderRadius: "var(--border-radius-medium)",
  textTransform: "var(--text-uppercase)",
  gap: "var(--gap-standart)",
  boxShadow: 2,
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  "& .MuiButton-startIcon": {
    marginLeft: 0,
    marginRight: 0,
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
