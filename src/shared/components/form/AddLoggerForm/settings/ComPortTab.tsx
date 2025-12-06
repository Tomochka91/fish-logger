import { Box, Divider, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormSelect } from "../../FormSelect/FormSelect";
import { UpdateButton } from "../../../ui/button/UpdateButton";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";
import { useQuery } from "@tanstack/react-query";
import { type SerialPort } from "../../../../types";
import { getSerialPorts } from "../../../../../api/apiSerialPorts";
import { Controller, useFormContext } from "react-hook-form";
import { type LoggerFormValues } from "../AddLoggerForm.types";
import { HelperText } from "../../FormHelperText/HelperText";
import { useMemo } from "react";

const baudrate: number[] = [
  1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600,
];
const databits: number[] = [5, 6, 7, 8];
const parity: string[] = ["None", "Even", "Odd", "Mark", "Space"];
const stopbits: number[] = [1.0, 1.5, 2.0];
const flowcontrol: string[] = ["None", "RTSCTS", "XONXOFF"];

export function ComPortTab() {
  const { control, watch } = useFormContext<LoggerFormValues>();

  const { data: serialPorts, refetch } = useQuery<SerialPort[]>({
    queryKey: ["serial-port"],
    queryFn: getSerialPorts,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const selectedPort = watch("easy_serial.port.port");
  const selectedPortData = useMemo(
    () => serialPorts?.find((port) => port.name === selectedPort),
    [serialPorts, selectedPort]
  );

  const handleUpdate = () => {
    refetch();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-mini)",
          borderTop: "var(--border-standart)",
          paddingBlock: "var(--pading-equal) .8rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "5fr 1fr",
            columnGap: "var(--gap-mini)",
          }}
        >
          <FormRow label="Port" labelWidth="30%">
            <FormControl fullWidth>
              <Controller
                name="easy_serial.port.port"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    {...field}
                    variant="outlined"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {serialPorts?.map((val) => (
                      <MenuItem key={val.name} value={val.name}>
                        {val.name}
                      </MenuItem>
                    ))}
                  </FormSelect>
                )}
              />
            </FormControl>
          </FormRow>
          <UpdateButton onClick={handleUpdate} />
          <HelperText sx={{ gridColumn: "1/-1" }}>
            {selectedPortData?.description ?? " "}
          </HelperText>
        </Box>

        <FormRow label="Baudrate" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="easy_serial.port.baudrate"
              control={control}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  variant="outlined"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  {baudrate.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </FormSelect>
              )}
            />
          </FormControl>
        </FormRow>

        <FormRow label="Databits" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="easy_serial.port.databits"
              control={control}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  variant="outlined"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  {databits.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </FormSelect>
              )}
            />
          </FormControl>
        </FormRow>

        <FormRow label="Parity" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="easy_serial.port.parity"
              control={control}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  variant="outlined"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {parity.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </FormSelect>
              )}
            />
          </FormControl>
        </FormRow>

        <FormRow label="Stopbits" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="easy_serial.port.stopbits"
              control={control}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  variant="outlined"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  {stopbits.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val.toFixed(1)}
                    </MenuItem>
                  ))}
                </FormSelect>
              )}
            />
          </FormControl>
        </FormRow>

        <FormRow label="Flowcontrol" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="easy_serial.port.flowcontrol"
              control={control}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  variant="outlined"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {flowcontrol.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </FormSelect>
              )}
            />
          </FormControl>
        </FormRow>

        <Controller
          name="easy_serial.port.autoconnect"
          control={control}
          render={({ field }) => (
            <FormRow label="Autoconnect" labelWidth="25%">
              <FormCheckbox
                id="autoconnect"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
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
