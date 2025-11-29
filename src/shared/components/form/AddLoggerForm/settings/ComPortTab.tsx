import { Box, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormSelect } from "../../FormSelect/FormSelect";
import { UpdateButton } from "../../../ui/button/UpdateButton";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type SerialPort } from "../../../../types";
import { getSerialPorts } from "../../../../../api/apiSerialPorts";

const baudrate: number[] = [
  1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600,
];
const databits: number[] = [5, 6, 7, 8];
const parity: string[] = ["None", "Even", "Odd", "Mark", "Space"];
const stopbits: number[] = [1.0, 1.5, 2.0];
const flowcontrol: string[] = ["None", "RTSCTS", "XONXOFF"];

export function ComPortTab() {
  const { data: serialPort, refetch } = useQuery<SerialPort[]>({
    queryKey: ["serialPort"],
    queryFn: getSerialPorts,
  });
  const [enable, setEnable] = useState(false);

  // const queryClient = useQueryClient(); // если нужно будет обновить после POST/PUT/другого действия

  const handleUpdate = () => {
    console.log("update port");
    refetch();

    // queryClient.invalidateQueries({ queryKey: ["serialPort"] });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="var(--gap-mini)"
      width="100%"
      borderTop="var(--border-standart)"
      paddingBlock="var(--pading-equal) .8rem"
    >
      <Box
        display="grid"
        gridTemplateColumns="4fr 1fr"
        columnGap="var(--gap-mini)"
      >
        <FormRow label="Port" labelWidth="25%">
          <FormControl fullWidth>
            <FormSelect variant="outlined">
              {serialPort?.map((val) => (
                <MenuItem key={val.name} value={val.name}>
                  {val.name}
                </MenuItem>
              ))}
            </FormSelect>
          </FormControl>
        </FormRow>
        <UpdateButton onClick={handleUpdate} />
      </Box>

      <FormRow label="Baudrate" labelWidth="20%">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            {baudrate.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
      </FormRow>

      <FormRow label="Databits" labelWidth="20%">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            {databits.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
      </FormRow>

      <FormRow label="Parity" labelWidth="20%">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            {parity.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
      </FormRow>

      <FormRow label="Stopbits" labelWidth="20%">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            {stopbits.map((val) => (
              <MenuItem key={val} value={val}>
                {val.toFixed(1)}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
      </FormRow>

      <FormRow label="Flowcontrol" labelWidth="20%">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            {flowcontrol.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>
      </FormRow>

      <FormRow label="Autoconnect" labelWidth="20%">
        <FormCheckbox
          checked={enable}
          onChange={(e) => setEnable(e.target.checked)}
        />
      </FormRow>
    </Box>
  );
}
