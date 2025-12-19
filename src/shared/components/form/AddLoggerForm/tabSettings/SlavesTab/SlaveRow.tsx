import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../../loggerForm.types";
import { Box, IconButton, MenuItem } from "@mui/material";
import { FormInput } from "../../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../../utils/numberField";
import {
  BsArrowReturnRight,
  BsPlusCircle,
  BsTrash,
  BsXCircle,
} from "react-icons/bs";
import { FormSelect } from "../../../FormSelect/FormSelect";
import type { ModbusEncodingType } from "../../../../../types";
import { makeNullableNumberChangeHandler } from "../../../../../utils/nullableNumberField";
import { HelperText } from "../../../FormHelperText/HelperText";

type SlaveRowProps = {
  index: number;
  fieldPrefix: "modbus_rtu" | "modbus_tcp";
  onRemove: () => void;
};

const encodingValues = [
  "u16",
  "s16",
  "u16_scaled",
  "s16_scaled",
  "u32_abcd",
  "u32_cdab",
  "s32_abcd",
  "s32_cdab",
  "u32_scaled_abcd",
  "u32_scaled_cdab",
  "s32_scaled_abcd",
  "s32_scaled_cdab",
  "f32_abcd",
  "f32_cdab",
  "f32_scaled_abcd",
  "f32_scaled_cdab",
];

export function SlaveRow({ index, fieldPrefix, onRemove }: SlaveRowProps) {
  const { control } = useFormContext<LoggerFormValues>();

  const slavePath = `${fieldPrefix}.slaves.${index}` as const;
  const variablesPath = `${slavePath}.variables` as const;

  const {
    fields: variableFields,
    append: appendVariable,
    remove: removeVariable,
  } = useFieldArray({ control, name: variablesPath });

  const isLastVariable = variableFields.length === 1;

  const handleAddVariable = () => {
    appendVariable({
      name: "",
      address: 0,
      encoding: "u16",
      k: 1.0,
      b: 0,
      default: null,
    });
  };

  return (
    <>
      <Box
        sx={{
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
              helperText={" "}
            />
          )}
        />

        <Controller
          name={`${slavePath}.slave_id`}
          control={control}
          rules={{
            required: "Id is required",
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
              slotProps={{ htmlInput: { step: 1, min: 1 } }}
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

      <Box
        sx={{
          gridColumn: "1 / -1",
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-mini)",
          borderBlockEnd: "var(--border-standart)",
          padding: "0 1rem",
        }}
      >
        {variableFields.map((item, varIndex) => {
          const varPath = `${variablesPath}.${varIndex}` as const;

          return (
            <Box
              key={item.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "min-content repeat(6, 1fr) min-content",
                gap: "var(--gap-standart)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsArrowReturnRight
                style={{
                  width: "1.6rem",
                  height: "1.6rem",
                  flexShrink: 0,
                  marginBlockEnd: "1rem",
                  padding: 0,
                }}
              />

              <Controller
                name={`${varPath}.name`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Variable name"
                    helperText={" "}
                  />
                )}
              />

              <Controller
                name={`${varPath}.address`}
                control={control}
                rules={{
                  required: "Address is required",
                  validate: (val) => {
                    if (typeof val !== "number") return true;
                    if (val < 0) return "Address must be ≥ 0";
                    if (!Number.isInteger(val))
                      return "Address must be an integer";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    type="number"
                    slotProps={{ htmlInput: { step: 1, min: 0 } }}
                    value={field.value ?? ""}
                    onChange={makeNumberChangeHandler(field)}
                    placeholder="Address"
                    helperText={fieldState.error?.message ?? " "}
                  />
                )}
              />

              <Controller
                name={`${varPath}.encoding`}
                control={control}
                render={({ field }) => (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormSelect
                      {...field}
                      value={field.value ?? ""}
                      variant="outlined"
                      onChange={(e) =>
                        field.onChange(e.target.value as ModbusEncodingType)
                      }
                    >
                      {encodingValues.map((val) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </FormSelect>
                    <HelperText> </HelperText>
                  </Box>
                )}
              />

              <Controller
                name={`${varPath}.k`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type="number"
                    slotProps={{ htmlInput: { step: "any" } }}
                    value={field.value ?? ""}
                    onChange={makeNumberChangeHandler(field)}
                    placeholder="k"
                    helperText={" "}
                  />
                )}
              />

              <Controller
                name={`${varPath}.b`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type="number"
                    slotProps={{ htmlInput: { step: "any" } }}
                    value={field.value ?? ""}
                    onChange={makeNumberChangeHandler(field)}
                    placeholder="b"
                    helperText={" "}
                  />
                )}
              />

              <Controller
                name={`${varPath}.default`}
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={makeNullableNumberChangeHandler(field)}
                    placeholder="default"
                    helperText={" "}
                  />
                )}
              />

              <IconButton
                onClick={() => removeVariable(varIndex)}
                disabled={isLastVariable}
                sx={{
                  padding: 0,
                  mb: "1rem",
                  width: "1.6rem",
                  height: "1.6rem",
                  opacity: isLastVariable ? 0.4 : 1,
                }}
              >
                <BsXCircle color="var(--color-indian-red)" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
