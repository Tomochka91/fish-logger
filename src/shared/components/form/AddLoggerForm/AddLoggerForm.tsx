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
import { type LoggerList, type LoggerType } from "../../../types";
import { TypeSettings } from "./TypeSettings";
import { useQuery } from "@tanstack/react-query";
import { getLoggerList } from "../../../../api/apiConnections";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { SaveButton } from "../../ui/button/SaveButton";
import { mapLoggerToFormValues } from "./addLoggerForm.mapper";

export type LoggerFormValues = {
  name: string;
  type: LoggerType;
  autostart: boolean;
  db_user: string;
  db_password: string;
  table_name: string;
  enabled: boolean;

  // easy_serial (часть формы, когда выбран type="easy_serial")
  easy_serial: {
    port: {
      port: string; // "/dev/ttyUSB0"
      baudrate: number; // 9600
      databits: number; // 8
      parity: string; // "None"
      stopbits: number; // 1, 1.5, 2
      flowcontrol: string; // "None"
      autoconnect: boolean;
    };
    parser: {
      preamble: string | null;
      terminator: string;
      separator: string;
      encoding: string;
    };
  } | null; // для других типов логгеров может быть null
};

const defaultLoggerValues: LoggerFormValues = {
  name: "",
  type: "",
  autostart: false,
  db_user: "",
  db_password: "",
  table_name: "",
  enabled: false,
  easy_serial: {
    port: {
      port: "",
      baudrate: 9600,
      databits: 8,
      parity: "None",
      stopbits: 1,
      flowcontrol: "None",
      autoconnect: false,
    },
    parser: {
      preamble: null,
      terminator: "\\n",
      separator: ";",
      encoding: "utf-8",
    },
  },
};

export function AddLoggerForm() {
  const methods = useForm<LoggerFormValues>({
    defaultValues: defaultLoggerValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = methods;

  const {
    data: loggerList,
    isLoading: isLoadingLoggers,
    isError: isLoggerError,
  } = useQuery<LoggerList>({
    queryKey: ["logger-list"],
    queryFn: getLoggerList,
  });

  const autocompleteOptions = loggerList?.map((log) => log.name) ?? [];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onClear = () => {
    reset(defaultLoggerValues);
  };

  const onSubmit = (values: LoggerFormValues) => {
    console.log("submit values", values);
  };

  const selectedType = watch("type");

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-standart)",
          width: "100%",
          marginBlock: "var(--margin-standart)",
          fontFamily: "var(--secondary-font)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            p: "var(--pading-equal)",
            borderRadius: "var(--border-radius-medium)",
            border: "var(--border-standart)",
            boxShadow: 1,
            fontFamily: "var(--secondary-font)",
          }}
        >
          <Stack direction="column" spacing="var(--gap-mini)" flex="1">
            <FormRow label="Logger name" labelWidth="25%">
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  const { value, onChange, ref } = field;

                  const handleSelectLogger = (
                    _event: React.SyntheticEvent,
                    newInputValue: string | null
                  ) => {
                    const name = newInputValue ?? "";
                    onChange(name);
                    const logger = loggerList?.find((log) => log.name === name);
                    if (logger) {
                      const mapped = mapLoggerToFormValues(logger);
                      reset(mapped);
                    }
                  };

                  return (
                    <FormAutocomplete
                      freeSolo
                      forcePopupIcon
                      options={autocompleteOptions}
                      inputValue={value}
                      onInputChange={handleSelectLogger}
                      renderInput={(params) => (
                        <FormInput
                          {...params}
                          inputRef={ref}
                          placeholder="New logger"
                          helperText={errors.name?.message ?? " "}
                        />
                      )}
                      slotProps={defaultAutocompleteSlotProps}
                    />
                  );
                }}
              />
            </FormRow>

            <FormRow label="Logger type" labelWidth="25%">
              <FormControl fullWidth>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      {...field}
                      variant="outlined"
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(event.target.value as LoggerType)
                      }
                    >
                      <MenuItem value={""}>Not selected</MenuItem>
                      <MenuItem value={"easy_serial"}>Easy Serial</MenuItem>
                      <MenuItem value={"mbox"}>Mbox</MenuItem>
                      <MenuItem value={"modbus_rtu"}>Modbus RTU</MenuItem>
                      <MenuItem value={"modbus_tcp"}>Modbus TCP</MenuItem>
                    </FormSelect>
                  )}
                />
                <HelperText>{errors.type?.message ?? " "}</HelperText>
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
                <Controller
                  name="autostart"
                  control={control}
                  render={({ field }) => (
                    <FormCheckbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
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
              <Controller
                name="db_user"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    fullWidth
                    helperText={errors.db_user?.message ?? " "}
                  />
                )}
              />
            </FormRow>

            <FormRow label="DB password" labelWidth="25%">
              <Controller
                name="db_password"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    helperText={errors.db_password?.message ?? " "}
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
                )}
              />
            </FormRow>

            <FormRow label="DB table" labelWidth="25%">
              <Controller
                name="table_name"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    fullWidth
                    helperText={errors.table_name?.message ?? " "}
                  />
                )}
              />
            </FormRow>

            <FormRow label="Enable DB writing" labelWidth="25%">
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--gap-mini)",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="enabled"
                  control={control}
                  render={({ field }) => (
                    <FormCheckbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        ...(errors && {
                          color: "var(--color-indian-red)",
                        }),
                      }}
                    />
                  )}
                />
                <HelperText>{errors.enabled?.message ?? " "}</HelperText>
              </Box>
            </FormRow>
          </Stack>
        </Box>

        {/* настройки в зависимости от type */}
        <TypeSettings type={selectedType} />

        <ClearButton onClick={onClear} label="Reset" />
        <SaveButton loading={isSubmitting} disabled={!isValid} />
      </Box>
    </FormProvider>
  );
}
