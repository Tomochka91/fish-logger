import { Box, Divider, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormSelect } from "../../FormSelect/FormSelect";
import { UpdateButton } from "../../../ui/button/UpdateButton";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";
import { useQuery } from "@tanstack/react-query";
import { type SerialPort } from "../../../../types";
import { getSerialPorts } from "../../../../../api/apiSerialPorts";
import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { HelperText } from "../../FormHelperText/HelperText";
import { hasMax2Decimals } from "../../../../utils/validation/hasMaxDecimalPlaces";
import { FormInput } from "../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../utils/numberField";

const baudrate: number[] = [
  1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600,
];
const databits: number[] = [5, 6, 7, 8];
const parity: string[] = ["None", "Even", "Odd", "Mark", "Space"];
const stopbits: number[] = [1.0, 1.5, 2.0];
const flowcontrol: string[] = ["None", "RTSCTS", "XONXOFF"];

type ComPortTabProps = {
  fieldPrefix: "easy_serial" | "modbus_rtu" | "mbox" | "mbox_counter";
};

export function ComPortTab({ fieldPrefix }: ComPortTabProps) {
  const { control } = useFormContext<LoggerFormValues>();

  const { data: serialPorts, refetch } = useQuery<SerialPort[]>({
    queryKey: ["serial-port"],
    queryFn: getSerialPorts,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleUpdate = () => {
    console.log(serialPorts);
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
                name={`${fieldPrefix}.port.port`}
                control={control}
                rules={{ required: "Port is required" }}
                render={({ field, fieldState }) => {
                  const availablePorts = serialPorts ?? [];
                  const savedPort = (field.value ?? "") as string;
                  const isSavedPortAvailable =
                    savedPort === "" ||
                    availablePorts.some((p) => p.name === savedPort);

                  const portsForSelect =
                    !savedPort || isSavedPortAvailable
                      ? availablePorts
                      : [
                          {
                            name: savedPort,
                            description: "Currently assigned (may be in use)",
                          },
                          ...availablePorts,
                        ];

                  const selectedPortData =
                    portsForSelect.find((p) => p.name === savedPort) ?? null;

                  return (
                    <>
                      <FormSelect
                        {...field}
                        variant="outlined"
                        value={savedPort || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">Select port</MenuItem>

                        {portsForSelect.map((p) => {
                          const isVirtual = !availablePorts.some(
                            (ap) => ap.name === p.name
                          );

                          return (
                            <MenuItem
                              key={p.name}
                              value={p.name}
                              disabled={isVirtual}
                            >
                              {p.name}
                              {isVirtual ? " (in use)" : ""}
                            </MenuItem>
                          );
                        })}
                      </FormSelect>
                      <HelperText
                        sx={{ gridColumn: "1/-1", minHeight: "1.6rem" }}
                      >
                        {fieldState.error
                          ? fieldState.error.message
                          : selectedPortData?.description
                          ? selectedPortData.description
                          : !isSavedPortAvailable && savedPort
                          ? "Currently assigned (may be in use)"
                          : " "}
                      </HelperText>
                    </>
                  );
                }}
              />
            </FormControl>
          </FormRow>
          <UpdateButton onClick={handleUpdate} sx={{ alignSelf: "start" }} />
        </Box>

        <FormRow label="Baudrate" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name={`${fieldPrefix}.port.baudrate`}
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
              name={`${fieldPrefix}.port.databits`}
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
              name={`${fieldPrefix}.port.parity`}
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
              name={`${fieldPrefix}.port.stopbits`}
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
              name={`${fieldPrefix}.port.flowcontrol`}
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
          name={`${fieldPrefix}.port.timeout`}
          control={control}
          rules={{
            required: "Timeout is required",
            min: { value: 0.1, message: "Timeout must be ≥ 0.1" },
            validate: (value) =>
              hasMax2Decimals(value) ||
              "Timeout can have at most 2 decimal places",
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Timeout" labelWidth="25%">
              <FormInput
                {...field}
                type="number"
                slotProps={{ htmlInput: { min: "0.1", step: "any" } }}
                value={field.value ?? ""}
                onChange={makeNumberChangeHandler(field)}
                id="comport_timeout"
                inputMode="decimal"
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name={`${fieldPrefix}.port.autoconnect`}
          control={control}
          render={({ field }) => (
            <FormRow label="Autoconnect" labelWidth="25%">
              <FormCheckbox
                id="autoconnect"
                checked={!!field.value}
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
