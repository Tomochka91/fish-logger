import { Box, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormSelect } from "../../FormSelect/FormSelect";

export function FramerTab() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="var(--gap-standart)"
      width="100%"
      borderTop="var(--border-standart)"
      paddingBlock="var(--pading-equal)"
    >
      <FormRow label="что-то">
        <FormControl fullWidth>
          <FormSelect variant="outlined">
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
          </FormSelect>
        </FormControl>
      </FormRow>
    </Box>
  );
}
