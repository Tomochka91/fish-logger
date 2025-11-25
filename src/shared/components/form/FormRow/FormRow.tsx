import { Box, Stack, Typography } from "@mui/material";

type FormRowProps = {
  label: string;
  children: React.ReactNode;
};

export function FormRow({ label, children }: FormRowProps) {
  return (
    <Stack
      direction="row"
      spacing="var(--gap-standart)"
      alignItems="flex-start"
      marginBottom="var(--margin-mini)"
    >
      <Box sx={{ width: "30%" }}>
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
