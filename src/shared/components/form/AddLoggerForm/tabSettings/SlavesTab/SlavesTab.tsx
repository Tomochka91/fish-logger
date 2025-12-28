import { Box, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../../loggerForm.types";
import { BsPlus } from "react-icons/bs";
import { HelperText } from "../../../FormHelperText/HelperText";
import { SlaveRow } from "./SlaveRow";

type SlavesTabProps = {
  fieldPrefix: "modbus_rtu" | "modbus_tcp";
};

export function SlavesTab({ fieldPrefix }: SlavesTabProps) {
  const { control } = useFormContext<LoggerFormValues>();

  const arrayName = `${fieldPrefix}.slaves` as const;

  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });

  const createDefaultVariable = () => ({
    name: "",
    address: 0,
    encoding: "u16" as const,
    k: 1.0,
    b: 0,
    default: null,
  });

  const handleAddFieldSlave = () => {
    append({
      slave_name: "",
      slave_id: 1,
      variables: [createDefaultVariable()],
    });
  };

  return (
    <>
      <Box
        sx={{
          gridColumn: "1/-1",
          marginTop: "var(--border-standart)",
          borderTop: "var(--border-standart)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          onClick={handleAddFieldSlave}
          size="large"
          sx={{ padding: "1rem", marginBlockStart: "1rem" }}
        >
          <BsPlus />
        </IconButton>
      </Box>

      <Box
        sx={{
          gridColumn: "1/-1",
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        {fields.length === 0 && (
          <HelperText
            sx={{
              marginBlockStart: "1rem",
              fontSize: "var(--small-font-size)",
              padding: "var(--padding-mini)",
              textAlign: "start",
            }}
          >
            {" "}
            There are no slaves yet. Click + to add.
          </HelperText>
        )}

        {fields.map((item, index) => (
          <SlaveRow
            key={item.id}
            index={index}
            fieldPrefix={fieldPrefix}
            onRemove={() => remove(index)}
          />
        ))}
      </Box>
    </>
  );
}
