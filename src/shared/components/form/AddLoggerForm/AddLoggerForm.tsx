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
import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultAutocompleteSlotProps } from "../FormAutocomplete/AutocompleteSlotProps";
import { FormCheckbox } from "../FormCheckBox/FormCheckBox";
import { ClearButton } from "../../ui/button/ClearButton";
import { type LoggerList, type LoggerType } from "../../../types";
import { TypeSettings } from "./TypeSettings";
import { useQuery } from "@tanstack/react-query";
import { getLoggerList } from "../../../../api/apiConnections";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { SaveButton } from "../../ui/button/SaveButton";
import { mapLoggerToFormValues } from "./mappers/addLoggerForm.mapper";
import { ConfirmDialog } from "../../ui/dialog/ConfirmDialog";
import { useDeleteLogger } from "../../../hooks/useDeleteLogger";
import { useSaveLogger } from "../../../hooks/useSaveLogger";
import {
  defaultLoggerValues,
  type LoggerFormValues,
} from "./AddLoggerForm.types";
import { useLoggerFormState } from "../../../hooks/useLoggerFormState";

export function AddLoggerForm() {
  const { state, setState } = useLoggerFormState();

  const methods = useForm<LoggerFormValues>({
    defaultValues: state.values as LoggerFormValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = methods;

  const watchedValues = useWatch<LoggerFormValues>({ control });

  useEffect(() => {
    setState({ values: watchedValues as LoggerFormValues });
  }, [watchedValues, setState]);

  const { data: loggerList } = useQuery<LoggerList>({
    queryKey: ["logger-list"],
    queryFn: getLoggerList,
  });

  const autocompleteOptions = useMemo(
    () => loggerList?.map((log) => log.name) ?? [],
    [loggerList]
  );

  const getLoggerByName = useCallback(
    (name: string | null | undefined) =>
      loggerList?.find((log) => log.name === name) ?? null,
    [loggerList]
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onClear = () => {
    reset(defaultLoggerValues);
  };

  const selectedType = watch("type");

  const selectedLoggerName = watch("name");
  const selectedLoggerObj = getLoggerByName(selectedLoggerName);

  const { saveLogger, isSaving, isEditMode } = useSaveLogger(selectedLoggerObj);

  const onSubmit = (values: LoggerFormValues) => {
    saveLogger(values, {
      onSuccess: () => {
        if (!isEditMode) {
          reset(defaultLoggerValues);
          setState({ values: defaultLoggerValues });
        }
      },
    });
  };

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { removeLogger, isDeleting } = useDeleteLogger();

  const handleOpenConfirmDialog = () => {
    if (!selectedLoggerObj) return;
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    if (isDeleting) return;
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedLoggerObj) return;

    removeLogger(selectedLoggerObj.id, {
      onSuccess: () => {
        setIsConfirmDialogOpen(false);
        reset(defaultLoggerValues);
      },
    });
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

                      if (!name) {
                        reset(defaultLoggerValues);
                        return;
                      }

                      const logger = getLoggerByName(name);

                      if (logger) {
                        const mapped = mapLoggerToFormValues(logger);
                        reset(mapped);
                      }
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

                {selectedLoggerObj && (
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
                      value={field.value ?? ""}
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
                                marginRight: 0,
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
                  <FormRow label="DB writing" labelWidth="25%">
                    <FormCheckbox
                      id="enable-db-writing"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={{
                        ...(errors.enabled && {
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
            loading={isSaving}
            disabled={!isValid}
            label={isEditMode ? "Update logger" : "Create logger"}
            startIcon={true}
          />
        </Box>
      </Box>

      <ConfirmDialog
        open={isConfirmDialogOpen}
        loading={isDeleting}
        title="Delete logger"
        description={`Are you sure you want to delete this logger: '${selectedLoggerObj?.name}'?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
      />
    </FormProvider>
  );
}
