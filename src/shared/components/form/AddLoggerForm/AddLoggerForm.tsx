import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { FormRow } from "../FormRow/FormRow";
import { FormSelect } from "../FormSelect/FormSelect";
import { HelperText } from "../FormHelperText/HelperText";
import { FormAutocomplete } from "../FormAutocomplete/FormAutocomplete";
import { FormInput } from "../FormInput/FormInput";
import { BsEye, BsEyeSlash, BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { defaultAutocompleteSlotProps } from "../FormAutocomplete/AutocompleteSlotProps";
import { FormCheckbox } from "../FormCheckBox/FormCheckBox";
import { ClearButton } from "../../ui/button/ClearButton";
import {
  type EasySerialField,
  type LoggerList,
  type LoggerType,
} from "../../../types";
import { TypeSettings } from "./TypeSettings";
import { useQuery } from "@tanstack/react-query";
import { getLoggerList } from "../../../../api/apiConnections";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { SaveButton } from "../../ui/button/SaveButton";
import { mapLoggerToFormValues } from "./addLoggerForm.mapper";
import { ConfirmDialog } from "../../ui/dialog/ConfirmDialog";

export type LoggerFormValues = {
  name: string;
  type: LoggerType;
  autostart: boolean;
  db_user: string;
  db_password: string;
  table_name: string;
  enabled: boolean;
  query_template: string;
  // easy_serial (часть формы, когда выбран type="easy_serial")
  easy_serial: {
    port: {
      port: string;
      baudrate: number;
      databits: number;
      parity: string;
      stopbits: number;
      flowcontrol: string;
      autoconnect: boolean;
    };
    parser: {
      preamble: string;
      terminator: string;
      separator: string;
      encoding: string;
      fields: EasySerialField[];
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
  query_template: "",
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
      preamble: "",
      terminator: "\\n",
      separator: ";",
      encoding: "utf-8",
      fields: [],
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

  const selectedLogger = watch("name");
  const existingLogger =
    loggerList?.find((log) => log.name === selectedLogger) ?? null;

  useEffect(() => {
    if (existingLogger) {
      const mapped = mapLoggerToFormValues(existingLogger);
      reset(mapped);
    }
  }, [existingLogger, reset]);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenConfirmDialog = () => {
    if (!selectedLogger) return;
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    if (isDeleting) return;
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting logger");
  };

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
          marginTop: "var(--margin-standart)",
          fontFamily: "var(--secondary-font)",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr min-content 1fr",
            p: "var(--pading-equal)",
            borderRadius: "var(--border-radius-medium)",
            border: "var(--border-standart)",
            boxShadow: 1,
            fontFamily: "var(--secondary-font)",
          }}
        >
          <Box>
            <FormRow label="Logger name" labelWidth="25%">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--gap-standart)",
                }}
              >
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

                      if (!name) return;
                      // const logger = loggerList?.find((log) => log.name === name);
                      // if (logger) {
                      //   const mapped = mapLoggerToFormValues(logger);
                      //   reset(mapped);
                      // }
                    };

                    return (
                      <FormAutocomplete
                        fullWidth
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

                {existingLogger && (
                  <IconButton
                    onClick={handleOpenConfirmDialog}
                    size="small"
                    sx={{
                      color: "var(--color-indian-red)",
                      flexShrink: 0,
                      alignSelf: "flex-start",
                    }}
                  >
                    <BsTrash color="var(--color-indian-red)" />
                  </IconButton>
                )}
              </Box>
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
                  <FormRow label="Autostart" labelWidth="25%">
                    <FormCheckbox
                      id="autostart"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormRow>
                )}
              />
            </Box>
          </Box>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ marginInline: "2rem" }}
          />

          <Box>
            <Controller
              name="db_user"
              control={control}
              render={({ field }) => (
                <FormRow label="DB user" labelWidth="25%">
                  <FormInput
                    {...field}
                    id="db-user"
                    fullWidth
                    helperText={errors.db_user?.message ?? " "}
                  />
                </FormRow>
              )}
            />

            <Controller
              name="db_password"
              control={control}
              render={({ field }) => (
                <FormRow label="DB password" labelWidth="25%">
                  <FormInput
                    {...field}
                    id="password"
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
                </FormRow>
              )}
            />

            <Controller
              name="table_name"
              control={control}
              render={({ field }) => (
                <FormRow label="DB table" labelWidth="25%">
                  <FormInput
                    {...field}
                    id="table-name"
                    fullWidth
                    helperText={errors.table_name?.message ?? " "}
                  />
                </FormRow>
              )}
            />

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
                  <FormRow label="Enable DB writing" labelWidth="25%">
                    <FormCheckbox
                      id="enable-db-writing"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        ...(errors && {
                          color: "var(--color-indian-red)",
                        }),
                      }}
                    />
                  </FormRow>
                )}
              />
              <HelperText>{errors.enabled?.message ?? " "}</HelperText>
            </Box>
          </Box>
        </Box>

        <TypeSettings type={selectedType} />

        <Box
          sx={{
            display: "inline-flex",
            gap: "var(--gap-standart)",
            flexShrink: 0,
          }}
        >
          <ClearButton onClick={onClear} label="Reset" />
          <SaveButton
            loading={isSubmitting}
            disabled={!isValid}
            startIcon={true}
          />
        </Box>
      </Box>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        loading={isDeleting}
        title="Delete logger"
        description={`Are you sure you want to delete this logger: '${existingLogger?.name}'?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
      />
    </FormProvider>
  );
}
