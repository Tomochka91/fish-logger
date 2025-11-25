import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
} from "@mui/material";
import { FormRow } from "../FormRow/FormRow";
import { FormSelect } from "../FormSelect/FormSelect";
import { HelperText } from "../FormHelpetText/HelperText";
import { FormAutocomplete } from "../FormAutocomplete/FormAutocomplete";
import { FormInput } from "../FormInput/FormInput";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { defaultAutocompleteSlotProps } from "../FormAutocomplete/AutocompleteSlotProps";
import { FormCheckbox } from "../FormCheckBox/FormCheckBox";
import { ClearButton } from "../../ui/button/ClearButton";
import { SaveButton } from "../../ui/button/SaveButton";

const backendLoggers = [
  { id: 1, name: "logger_A" },
  { id: 2, name: "logger_B" },
];

export function AddLoggerForm() {
  const autocompleteOptionName = backendLoggers.map((name) => name.name);
  const [loggerName, setLoggerName] = useState("");
  const [enable, setEnable] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onClear = () => console.log("Очистить логи");

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
          mt: "var(--margin-big)",
          mb: "var(--margin-big)",
          p: "var(--padding-special)",
          borderRadius: "var(--border-radius-medium)",
          border: "var(--border-standart)",
          boxShadow: 1,
          fontFamily: "var(--secondary-font)",
        }}
      >
        <Stack direction="column" spacing="var(--gap-mini)" flex="1">
          <FormRow label="name">
            <FormAutocomplete
              freeSolo
              forcePopupIcon
              value={loggerName}
              // onChange={(_, newValue) => {
              //   // с options: string[] newValue здесь строка или null
              //   setLoggerName(newValue ?? "");
              // }}
              options={autocompleteOptionName}
              renderInput={(params) => (
                <FormInput {...params} placeholder="New logger" helperText="" />
              )}
              slotProps={defaultAutocompleteSlotProps}
            />
            <HelperText></HelperText>
          </FormRow>

          <FormRow label="type">
            <FormControl fullWidth>
              <FormSelect variant="outlined">
                <MenuItem value={"easy_serial"}>Easy Serial</MenuItem>
                <MenuItem value={"mbox"}>Mbox</MenuItem>
                <MenuItem value={"modbus_rtu"}>Modbus RTU</MenuItem>
                <MenuItem value={"modbus_tcp"}>Modbus TCP</MenuItem>
              </FormSelect>
              <HelperText></HelperText>
            </FormControl>
          </FormRow>

          <FormRow label="enable">
            <Box
              sx={{
                height: "6.4rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <FormCheckbox
                checked={enable}
                onChange={(e) => setEnable(e.target.checked)}
                // sx={{
                //   ...(error && {
                //     color: "var(--color-indian-red)",
                //   }),
                // }}
              />
              <HelperText></HelperText>
            </Box>
          </FormRow>
        </Stack>

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginInline: "2rem" }}
        />

        <Stack flex="1" direction="column" spacing="var(--gap-mini)">
          <FormRow label="db_user">
            <FormInput fullWidth helperText={" "} />
          </FormRow>

          <FormRow label="db_password">
            <FormInput
              fullWidth
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              helperText={" "}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={togglePassword}
                        tabIndex={-1}
                      >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormRow>

          <FormRow label="table">
            <FormInput fullWidth helperText={" "} />
          </FormRow>
        </Stack>
      </Box>

      <ClearButton onClick={onClear} label="Reset" />
      {/* <SaveButton loading={isSaving} disabled={!isValid} /> */}
    </>
  );
}
