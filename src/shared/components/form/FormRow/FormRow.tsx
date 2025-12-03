import { Box, Stack, Typography } from "@mui/material";

type FormRowProps = {
  label: string;
  children: React.ReactNode;
  labelWidth?: string | number;
};

export function FormRow({ label, children, labelWidth = "30%" }: FormRowProps) {
  return (
    <Stack
      direction="row"
      spacing="var(--gap-standart)"
      // alignItems="flex-start"
    >
      <Box sx={{ width: labelWidth, flexShrink: 0 }}>
        <Typography
          component="label"
          sx={{
            fontSize: "var(--medium-font-size)",
            color: "var(--color-gunmetal)",
            fontFamily: "var(--secondary-font)",
          }}
        >
          {label}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Stack>
  );
}
