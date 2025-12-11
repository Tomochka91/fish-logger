import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { Box, Divider } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../utils/numberField";

export function PollIntervalTab() {
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
          name="modbus_rtu.poll_interval"
          control={control}
          rules={{
            validate: (val) =>
              val >= 1 ? true : "interval must be greater than or equal to 1",
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Poll interval" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                type="number"
                id="poll-interval"
                fullWidth
                onChange={makeNumberChangeHandler(field)}
                helperText={fieldState.error?.message ?? " "}
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
