import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../../loggerForm.types";
import { Box, IconButton } from "@mui/material";
import { FormInput } from "../../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../../utils/numberField";
import { BsPlusCircle, BsTrash } from "react-icons/bs";

type SlaveRowProps = {
  index: number;
  fieldPrefix: "modbus_rtu";
  onRemove: () => void;
};

export function SlaveRow({ index, fieldPrefix, onRemove }: SlaveRowProps) {
  const { control } = useFormContext<LoggerFormValues>();

  const slavePath = `${fieldPrefix}.slaves.${index}` as const;
  const variablesPath = `${slavePath}.variables` as const;

  const {
    fields: variableFields,
    append: appendVariable,
    remove: removeVariable,
  } = useFieldArray({ control, name: variablesPath });

  const handleAddVariable = () => {
    appendVariable({
      name: "",
      address: 0,
      encoding: "",
      k: 1,
      b: 0,
      default: null,
    });
  };

  return (
    <Box
      sx={{
        // border: "var(--border-standart)",
        display: "flex",
        gap: "var(--gap-standart)",
        padding: "1rem 1rem 0",
      }}
    >
      <Controller
        name={`${slavePath}.slave_name`}
        control={control}
        render={({ field }) => (
          <FormInput
            {...field}
            value={field.value ?? ""}
            placeholder="Slave Name"
          />
        )}
      />

      <Controller
        name={`${slavePath}.slave_id`}
        control={control}
        rules={{
          validate: (val) => (val > 0 ? true : "index must be greater than 0"),
        }}
        render={({ field, fieldState }) => (
          <FormInput
            {...field}
            value={field.value ?? ""}
            type="number"
            onChange={makeNumberChangeHandler(field)}
            helperText={fieldState.error?.message ?? " "}
          />
        )}
      />

      <IconButton
        onClick={handleAddVariable}
        size="small"
        sx={{ mb: "1rem", padding: 0 }}
      >
        <BsPlusCircle />
      </IconButton>

      <IconButton
        onClick={onRemove}
        size="small"
        sx={{ mb: "1rem", padding: 0 }}
      >
        <BsTrash color="var(--color-indian-red)" />
      </IconButton>
    </Box>
  );
}
