import {
  Box,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormInput } from "../../FormInput/FormInput";
import type { LoggerFormValues } from "../loggerForm.types";
import { BsPlus, BsTrash } from "react-icons/bs";
import type { EasySerialField, EasySerialFieldType } from "../../../../types";
import { HelperText } from "../../FormHelperText/HelperText";
import { FormSelect } from "../../FormSelect/FormSelect";
import { makeNumberChangeHandler } from "../../../../utils/numberField";
import { TestEasySerialParser } from "../easy-serial/TestEasySerialParser";

const tableColumnHeading = [
  { key: "name", label: "Variable Name" },
  { key: "index", label: "Index" },
  { key: "type", label: "Type" },
  { key: "format", label: "Format" },
];

const tableSx = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr) min-content",
  columnGap: "var(--gap-mini)",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "var(--border-standart)",
};

const typeValues = ["string", "int", "float", "datetime"];

export function FramerTab() {
  const { control } = useFormContext<LoggerFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "easy_serial.parser.fields",
  });

  const fieldTypes = useWatch({
    control,
    name: "easy_serial.parser.fields",
  }) as EasySerialField[] | undefined;

  const handleAddField = () => {
    append({
      name: "",
      index: 0,
      type: "string" as EasySerialFieldType,
      format: "",
    });
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingBlock: "var(--pading-equal) 2px",
          borderTop: "var(--border-standart)",
        }}
      >
        <Controller
          name="easy_serial.parser.preamble"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="Preamble" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="preamble"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="easy_serial.parser.terminator"
          control={control}
          rules={{ required: "Terminator is required" }}
          render={({ field, fieldState }) => (
            <FormRow label="Terminator" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="terminator"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="easy_serial.parser.separator"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="Separator" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="separator"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="easy_serial.parser.encoding"
          control={control}
          render={({ field, fieldState }) => (
            <FormRow label="Encoding" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="encoding"
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

      <TestEasySerialParser />

      <Box
        sx={{
          gridColumn: "1/-1",
          marginTop: "var(--border-standart)",
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
              There are no fields yet. Click + to add.
            </HelperText>
          )}

          {fields.map((item, index) => {
            const currentType = fieldTypes?.[index]?.type;

            return (
              <Box
                key={item.id}
                sx={{
                  ...tableSx,
                  borderTop: 0,
                  padding: "1rem 2px 0",
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
                  name={`easy_serial.parser.fields.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      value={field.value ?? ""}
                      placeholder="value"
                      helperText={" "}
                    />
                  )}
                />

                <Controller
                  name={`easy_serial.parser.fields.${index}.index`}
                  control={control}
                  rules={{
                    required: "Index is required",
                    validate: (val) =>
                      val >= 0
                        ? true
                        : "index must be greater than or equal to 0",
                  }}
                  render={({ field, fieldState }) => (
                    <FormInput
                      {...field}
                      slotProps={{ htmlInput: { step: 1, min: 0 } }}
                      value={field.value ?? ""}
                      type="number"
                      onChange={makeNumberChangeHandler(field)}
                      helperText={fieldState.error?.message ?? " "}
                    />
                  )}
                />

                <FormControl fullWidth>
                  <Controller
                    name={`easy_serial.parser.fields.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormSelect
                          {...field}
                          value={field.value ?? ""}
                          variant="outlined"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value as EasySerialFieldType
                            )
                          }
                        >
                          {typeValues.map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </FormSelect>
                        <HelperText> </HelperText>
                      </>
                    )}
                  />
                </FormControl>

                <Controller
                  name={`easy_serial.parser.fields.${index}.format`}
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      value={field.value ?? ""}
                      disabled={currentType !== "datetime"}
                      placeholder={
                        currentType === "datetime" ? "%Y-%m-%d %H:%M" : ""
                      }
                      helperText={" "}
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
    </>
  );
}
