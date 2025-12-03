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
import type { LoggerFormValues } from "../AddLoggerForm";
import { BsPlus, BsTrash } from "react-icons/bs";
import type { EasySerialField, EasySerialFieldType } from "../../../../types";
import { HelperText } from "../../FormHelpetText/HelperText";
import { FormSelect } from "../../FormSelect/FormSelect";

const tableHeadingSx = {
  textAlign: "center",
  fontSize: "var(--medium-font-size)",
  fontFamily: "var(--secondary-font)",
  lineHeight: "var( --line-height-standart)",
  color: "var(--color-jungle-green)",
};

const tableSx = {
  backgroundColor: "white",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr) min-content",
  columnGap: "var(--gap-mini)",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "var(--border-standart)",
};

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
    <Box
      width="100%"
      display="grid"
      gridTemplateColumns="1fr min-content 1fr"
      gridTemplateRows="auto 1fr" // 👈 верх (поля) + низ (таблица)
      sx={{ minHeight: 0, flex: 1 }}
    >
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
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ marginInline: "2rem" }}
      />

      <Box
        gridColumn="1/-1"
        borderTop="var(--border-standart)"
        mt="var(--margin-mini)"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ ...tableSx, backgroundColor: "var(--color-mint-cream)" }}>
          <Typography component="h3" sx={tableHeadingSx}>
            Variable Name
          </Typography>

          <Typography component="h3" sx={tableHeadingSx}>
            Index
          </Typography>

          <Typography component="h3" sx={tableHeadingSx}>
            Type
          </Typography>

          <Typography component="h3" sx={tableHeadingSx}>
            Format
          </Typography>

          <IconButton onClick={handleAddField} size="small">
            <BsPlus />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: "10vh",
            overflowY: "auto", // 👈 здесь скролл
          }}
        >
          {fields.length === 0 && (
            <HelperText sx={{ padding: "var(--padding-mini)" }}>
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
                  padding: "var(--padding-mini) 0",
                  "&:nth-of-type(odd)": {
                    backgroundColor: "var(--color-honeydew)",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  },
                }}
              >
                <Controller
                  name={`easy_serial.parser.fields.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <FormInput {...field} placeholder="value" />
                  )}
                />

                <Controller
                  name={`easy_serial.parser.fields.${index}.index`}
                  control={control}
                  render={({ field }) => <FormInput {...field} type="number" />}
                />

                <FormControl fullWidth>
                  <Controller
                    name={`easy_serial.parser.fields.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <FormSelect
                        {...field}
                        variant="outlined"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value as EasySerialFieldType)
                        }
                      >
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="int">int</MenuItem>
                        <MenuItem value="float">float</MenuItem>
                        <MenuItem value="datetime">datetime</MenuItem>
                      </FormSelect>
                    )}
                  />
                </FormControl>

                <Controller
                  name={`easy_serial.parser.fields.${index}.format`}
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      disabled={currentType !== "datetime"}
                      placeholder={
                        currentType === "datetime" ? "%Y-%m-%d %H:%M" : ""
                      }
                    />
                  )}
                />

                <IconButton onClick={() => remove(index)} size="small">
                  <BsTrash color="var(--color-indian-red)" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
