import { Box, Typography } from "@mui/material";
import React from "react";

type FormRowProps = {
  label: string;
  children: React.ReactNode;
  labelWidth?: string | number;
};

export function FormRow({ label, children, labelWidth = "30%" }: FormRowProps) {
  let childId: string | undefined;

  if (React.isValidElement(children)) {
    childId = (children.props as { id?: string }).id;
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "var(--gap-standart)",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Box sx={{ width: labelWidth, flexShrink: 0 }}>
        <Typography
          component="label"
          htmlFor={childId}
          sx={{
            fontSize: "var(--medium-font-size)",
            color: "var(--color-gunmetal)",
            fontFamily: "var(--secondary-font)",
            cursor: "pointer",
          }}
        >
          {label}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
    </Box>
  );
}
