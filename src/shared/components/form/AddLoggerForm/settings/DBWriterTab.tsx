import { Controller, useFormContext } from "react-hook-form";
import { type LoggerFormValues } from "../AddLoggerForm.types";
import { Box, Divider } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";

export function DBWriter() {
  const { control } = useFormContext<LoggerFormValues>();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-mini)",
          borderTop: "var(--border-standart)",
          paddingBlock: "var(--pading-equal)",
        }}
      >
        <Controller
          name="query_template"
          control={control}
          render={({ field }) => (
            <FormRow label="DB Writer" labelWidth="25%">
              <FormInput
                {...field}
                id="db-writer"
                fullWidth
                multiline
                maxRows={15}
              />
            </FormRow>
          )}
        />
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ marginInline: "2rem" }}
      />
    </>
  );
}
