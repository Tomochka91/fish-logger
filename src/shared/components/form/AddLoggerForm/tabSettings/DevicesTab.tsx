import { Box, IconButton, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "../../FormInput/FormInput";
import type { LoggerFormValues } from "../loggerForm.types";
import { BsPlus, BsTrash } from "react-icons/bs";
import { HelperText } from "../../FormHelperText/HelperText";
import { makeNumberChangeHandler } from "../../../../utils/numberField";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";

const tableColumnHeading = [
  { key: "id", label: "Device Id" },
  { key: "name", label: "Device Name" },
  { key: "serial", label: "Serial" },
  { key: "enabled", label: "Enabled" },
];

const tableSx = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr) minmax(8rem, max-content) min-content",
  columnGap: "var(--gap-mini)",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "var(--border-standart)",
  paddingInline: "1rem",
};

export function DevicesTab() {
  const { control } = useFormContext<LoggerFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mbox_counter.devices",
  });

  const handleAddField = () => {
    append({
      device_id: 1,
      name: "",
      serial: 0,
      enabled: true,
    });
  };

  return (
    <Box
      sx={{
        gridColumn: "1/-1",
        borderTop: "var(--border-standart)",
        paddingBlock: "1.2rem",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <Box sx={{ ...tableSx, backgroundColor: "var(--color-mint-cream)" }}>
        {tableColumnHeading.map((col) => (
          <Typography
            key={col.key}
            component="h3"
            sx={{
              textAlign: "center",
              fontSize: "var(--medium-font-size)",
              fontFamily: "var(--secondary-font)",
              lineHeight: "var( --line-height-standart)",
              color: "var(--color-jungle-green)",
            }}
          >
            {col.label}
          </Typography>
        ))}
        <IconButton onClick={handleAddField} size="small">
          <BsPlus />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: "10vh",
          overflowY: "auto",
        }}
      >
        {fields.length === 0 && (
          <HelperText
            sx={{
              fontSize: "var(--small-font-size)",
              padding: "var(--padding-mini)",
            }}
          >
            There are no devices yet. Click + to add.
          </HelperText>
        )}

        {fields.map((item, index) => {
          return (
            <Box
              key={item.id}
              sx={{
                ...tableSx,
                borderTop: 0,
                padding: "1rem 1rem 0",
                "&:nth-of-type(odd)": {
                  backgroundColor: "var(--color-honeydew)",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                },
                "&:last-of-type": {
                  borderBottom: "var(--border-standart)",
                },
              }}
            >
              <Controller
                name={`mbox_counter.devices.${index}.device_id`}
                control={control}
                rules={{
                  required: "Device Id is required",
                  validate: (val) => {
                    if (typeof val !== "number") return true;
                    if (val <= 0) return "Id must be greater than 0";
                    if (!Number.isInteger(val)) return "Id must be an integer";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    value={field.value ?? ""}
                    type="number"
                    slotProps={{ htmlInput: { step: 1, min: 1 } }}
                    onChange={makeNumberChangeHandler(field)}
                    placeholder="Device Id"
                    helperText={fieldState.error?.message ?? " "}
                  />
                )}
              />

              <Controller
                name={`mbox_counter.devices.${index}.name`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Device name"
                    helperText={" "}
                  />
                )}
              />

              <Controller
                name={`mbox_counter.devices.${index}.serial`}
                control={control}
                rules={{
                  required: "Serial is required",
                  min: { value: 0, message: "Port must be ≥ 0" },
                  max: { value: 65535, message: "Serial must be ≤ 65535" },
                  validate: (value) =>
                    typeof value !== "number"
                      ? true
                      : Number.isInteger(value) || "Serial must be an integer",
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    value={field.value ?? ""}
                    onChange={makeNumberChangeHandler(field)}
                    inputMode="numeric"
                    placeholder="Serial"
                    helperText={fieldState.error?.message ?? " "}
                  />
                )}
              />

              <Controller
                name={`mbox_counter.devices.${index}.enabled`}
                control={control}
                render={({ field }) => (
                  <FormCheckbox
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    sx={{ mb: "1rem" }}
                  />
                )}
              />

              <IconButton
                onClick={() => remove(index)}
                size="small"
                sx={{ mb: "1rem" }}
              >
                <BsTrash color="var(--color-indian-red)" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
