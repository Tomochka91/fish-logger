import { Box, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../../loggerForm.types";
import { BsPlus } from "react-icons/bs";
import { HelperText } from "../../../FormHelperText/HelperText";
import { SlaveRow } from "./SlaveRow";

type SlavesTabProps = {
  fieldPrefix: "modbus_rtu";
};

export function SlavesTab({ fieldPrefix }: SlavesTabProps) {
  const { control } = useFormContext<LoggerFormValues>();

  const arrayName = `${fieldPrefix}.slaves` as const;

  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });

  const handleAddFieldSlave = () => {
    append({
      slave_name: "",
      slave_id: 1,
      variables: [],
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
          // flexShrink: 0,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          onClick={handleAddFieldSlave}
          size="large"
          sx={{ padding: "1rem" }}
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
