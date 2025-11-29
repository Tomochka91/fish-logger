import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  type SelectProps,
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
import { type LoggerType } from "../../../types";
import { TypeSettings } from "./TypeSettings";

const backendLoggers = [
  { id: 1, name: "logger_A" },
  { id: 2, name: "logger_B" },
];

// const defaultLoggerValues = {};

export function AddLoggerForm() {
  // const {
  //   register,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm({ defaultValues: defaultLoggerValues });

  const autocompleteOptionName = backendLoggers.map((name) => name.name);
  const [loggerName, setLoggerName] = useState("");

  const [type, setType] = useState<LoggerType>("");
  const handleTypeChange: SelectProps["onChange"] = (event) => {
    const value = event.target.value as LoggerType;
    setType(value);
  };

  const [autostart, setAutostart] = useState(false);
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
          marginBlock: "var(--margin-standart)",
          p: "var(--pading-equal)",
          borderRadius: "var(--border-radius-medium)",
          border: "var(--border-standart)",
          boxShadow: 1,
          fontFamily: "var(--secondary-font)",
        }}
      >
        <Stack direction="column" spacing="var(--gap-mini)" flex="1">
          <FormRow label="Logger name" labelWidth="25%">
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

          <FormRow label="Logger type" labelWidth="25%">
            <FormControl fullWidth>
              <FormSelect
                variant="outlined"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value={"easy_serial"}>Easy Serial</MenuItem>
                <MenuItem value={"mbox"}>Mbox</MenuItem>
                <MenuItem value={"modbus_rtu"}>Modbus RTU</MenuItem>
                <MenuItem value={"modbus_tcp"}>Modbus TCP</MenuItem>
              </FormSelect>
              <HelperText></HelperText>
            </FormControl>
          </FormRow>

          <FormRow label="Autostart" labelWidth="25%">
            <Box
              sx={{
                display: "flex",
                gap: "var(--gap-mini)",
                alignItems: "center",
              }}
            >
              <FormCheckbox
                checked={autostart}
                onChange={(e) => setAutostart(e.target.checked)}
                // sx={{
                //   ...(error && {
                //     color: "var(--color-indian-red)",
                //   }),
                // }}
              />
              {/* <HelperText>err</HelperText> */}
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
          <FormRow label="DB user" labelWidth="25%">
            <FormInput fullWidth helperText={" "} />
          </FormRow>

          <FormRow label="DB password" labelWidth="25%">
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
                        sx={{
                          "& svg": {
                            width: "1.8rem",
                            height: "1.8rem",
                          },
                        }}
                      >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormRow>

          <FormRow label="DB table" labelWidth="25%">
            <FormInput fullWidth helperText={" "} />
          </FormRow>

          <FormRow label="Enable DB writing" labelWidth="25%">
            <Box
              sx={{
                display: "flex",
                gap: "var(--gap-mini)",
                alignItems: "center",
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
              {/* <HelperText>err</HelperText> */}
            </Box>
          </FormRow>
        </Stack>
      </Box>

      {/* настройки в зависимости от type */}
      <TypeSettings type={type} />

      <ClearButton onClick={onClear} label="Reset" />
      {/* <SaveButton loading={isSaving} disabled={!isValid} /> */}
    </>
  );
}
