import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { Box, Divider, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../utils/numberField";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";
import { FormSelect } from "../../FormSelect/FormSelect";
import { HelperText } from "../../FormHelperText/HelperText";

const strategy: string[] = ["last", "default"];

export function CounterTab() {
  const { control, watch } = useFormContext<LoggerFormValues>();

  const extCounterEnabled = watch("mbox.ext_counter");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTop: "var(--border-standart)",
          paddingBlock: "var(--pading-equal) 1.2rem",
        }}
      >
        <Controller
          name="mbox.ext_counter"
          control={control}
          render={({ field }) => (
            <FormRow label="Ext-counter" labelWidth="25%">
              <FormCheckbox
                id="mbox_zero"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                sx={{ mb: "0.8rem" }}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.counter_device_id"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            validate: (val) => {
              if (typeof val !== "number") return true;
              if (val <= 0) return "Id must be greater than 0";
              if (!Number.isInteger(val)) return "Id must be an integer";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Device id" labelWidth="25%">
              <FormInput
                {...field}
                type="number"
                id="mbox-device-id"
                slotProps={{ htmlInput: { step: 1, min: 1 } }}
                value={field.value ?? ""}
                onChange={makeNumberChangeHandler(field)}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <FormRow label="Strategy" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="mbox.miss_strategy"
              control={control}
              rules={{
                required: extCounterEnabled
                  ? "Required when ext counter enabled"
                  : false,
              }}
              render={({ field, fieldState }) => (
                <>
                  <FormSelect
                    {...field}
                    variant="outlined"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {strategy.map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </FormSelect>
                  <HelperText>{fieldState.error?.message ?? " "}</HelperText>
                </>
              )}
            />
          </FormControl>
        </FormRow>

        <Controller
          name="mbox.miss_insert_limit"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            validate: (val) => {
              if (typeof val !== "number") return true;
              if (val <= 0) return "Insert limit must be greater than 0";
              if (!Number.isInteger(val))
                return "Insert limit must be an integer";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Insert limit" labelWidth="25%">
              <FormInput
                {...field}
                type="number"
                id="mbox-insert-limit"
                slotProps={{ htmlInput: { step: 1, min: 1 } }}
                value={field.value ?? ""}
                onChange={makeNumberChangeHandler(field)}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_error_label"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Error label" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-error-label"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_default"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Default" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-default"
                fullWidth
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
