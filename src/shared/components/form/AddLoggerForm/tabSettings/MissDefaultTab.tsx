import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { Box, Divider } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";

export function MissDefaultTab() {
  const { control } = useFormContext<LoggerFormValues>();

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
          name="mbox.miss_default.fish_name"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="Fish name" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-fish-name"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_default.fish_grade"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="Fish grade" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-fish-grade"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_default.n_weight"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="N Weight" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-n-weight"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_default.r_weight"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="R Weight" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-r-weight"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_default.sn"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="SN" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-sn"
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
