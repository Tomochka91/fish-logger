import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { Box, Divider } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../utils/numberField";
import { hasMax2Decimals } from "../../../../utils/validation/hasMaxDecimalPlaces";

type PollIntervalTabProps = {
  fieldPrefix: "modbus_rtu" | "modbus_tcp";
};

export function PollIntervalTab({ fieldPrefix }: PollIntervalTabProps) {
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
          name={`${fieldPrefix}.poll_interval`}
          control={control}
          rules={{
            required: "Poll interval is required",
            min: { value: 0.1, message: "Interval must be ≥ 0.1" },
            validate: (value) =>
              hasMax2Decimals(value) ||
              "Interval can have at most 2 decimal places",
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Poll interval" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                type="number"
                id="poll-interval"
                fullWidth
                slotProps={{ htmlInput: { min: "0.1", step: "any" } }}
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
