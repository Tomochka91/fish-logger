import { Box } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { Controller, useFormContext } from "react-hook-form";
import { FormInput } from "../../FormInput/FormInput";
import type { LoggerFormValues } from "../AddLoggerForm";

export function FramerTab() {
  const { control } = useFormContext<LoggerFormValues>();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="var(--gap-mini)"
      width="100%"
      borderTop="var(--border-standart)"
      paddingBlock="var(--pading-equal)"
    >
      <FormRow label="Preamble" labelWidth="25%">
        <Controller
          name="easy_serial.parser.preamble"
          control={control}
          render={({ field }) => <FormInput {...field} fullWidth />}
        />
      </FormRow>

      <FormRow label="Terminator" labelWidth="25%">
        <Controller
          name="easy_serial.parser.terminator"
          control={control}
          render={({ field }) => <FormInput {...field} fullWidth />}
        />
      </FormRow>

      <FormRow label="Separator" labelWidth="25%">
        <Controller
          name="easy_serial.parser.separator"
          control={control}
          render={({ field }) => <FormInput {...field} fullWidth />}
        />
      </FormRow>

      <FormRow label="Encoding" labelWidth="25%">
        <Controller
          name="easy_serial.parser.encoding"
          control={control}
          render={({ field }) => <FormInput {...field} fullWidth />}
        />
      </FormRow>
    </Box>
  );
}
