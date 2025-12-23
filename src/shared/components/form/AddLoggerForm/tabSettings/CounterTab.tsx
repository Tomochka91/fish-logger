import { Controller, useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { Box, Divider, FormControl, MenuItem } from "@mui/material";
import { FormRow } from "../../FormRow/FormRow";
import { FormInput } from "../../FormInput/FormInput";
import { makeNumberChangeHandler } from "../../../../utils/numberField";
import { FormCheckbox } from "../../FormCheckBox/FormCheckBox";
import { FormSelect } from "../../FormSelect/FormSelect";
import { HelperText } from "../../FormHelperText/HelperText";
import { hasMax2Decimals } from "../../../../utils/validation/hasMaxDecimalPlaces";
import { useEffect, useMemo } from "react";
import { MBOX_COUNTER_DEFAULTS } from "../mbox/mboxFormDefaults";
import { useQuery } from "@tanstack/react-query";
import { getMboxAvailableCounters } from "../../../../../api/apiConnections";

const strategy: string[] = ["last", "default"];

const MBOX_COUNTER_DEFAULT_PATHS = [
  ["mbox.counter_connection_id", MBOX_COUNTER_DEFAULTS.counter_connection_id],
  ["mbox.counter_device_id", MBOX_COUNTER_DEFAULTS.counter_device_id],
  ["mbox.counter_clean_timeout", MBOX_COUNTER_DEFAULTS.counter_clean_timeout],
  ["mbox.counter_miss_timeout", MBOX_COUNTER_DEFAULTS.counter_miss_timeout],
  ["mbox.miss_strategy", MBOX_COUNTER_DEFAULTS.miss_strategy],
  ["mbox.miss_insert_limit", MBOX_COUNTER_DEFAULTS.miss_insert_limit],
  ["mbox.miss_error_label", MBOX_COUNTER_DEFAULTS.miss_error_label],
] as const;

export function CounterTab() {
  const { control, watch, clearErrors, setValue } =
    useFormContext<LoggerFormValues>();

  const {
    data: availableCountersList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mbox-available-counters"],
    queryFn: getMboxAvailableCounters,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const counters = useMemo(
    () => availableCountersList?.data ?? [],
    [availableCountersList?.data]
  );

  const extCounterEnabled = !!watch("mbox.ext_counter");

  useEffect(() => {
    if (!extCounterEnabled) {
      clearErrors(MBOX_COUNTER_DEFAULT_PATHS.map(([path]) => path));
      MBOX_COUNTER_DEFAULT_PATHS.forEach(([path, value]) => {
        setValue(path, value);
      });
    }
  }, [extCounterEnabled, clearErrors, setValue]);

  const selectedConnectionId = watch("mbox.counter_connection_id");
  const currentDeviceId = watch("mbox.counter_device_id");

  useEffect(() => {
    if (!extCounterEnabled) return;

    if (typeof selectedConnectionId !== "number") return;

    const selected = counters.find(
      (c) => c.counter_connection_id === selectedConnectionId
    );
    if (!selected) return;

    if (currentDeviceId === selected.device_id) return;

    setValue("mbox.counter_device_id", selected.device_id ?? null, {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [
    extCounterEnabled,
    selectedConnectionId,
    currentDeviceId,
    counters,
    setValue,
  ]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTop: "var(--border-standart)",
          paddingBlock: "var(--pading-equal) 1.2rem",
        }}
      >
        <Controller
          name="mbox.ext_counter"
          control={control}
          render={({ field }) => (
            <FormRow label="Ext-counter" labelWidth="25%">
              <FormCheckbox
                id="mbox-ext-counter"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                sx={{ mb: "0.8rem" }}
              />
            </FormRow>
          )}
        />

        <FormRow label="Counter connection" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="mbox.counter_connection_id"
              control={control}
              rules={{
                required: extCounterEnabled
                  ? "Required when ext counter enabled"
                  : false,
                validate: (val) => {
                  if (!extCounterEnabled) return true;
                  if (typeof val !== "number") return "Select connection";
                  if (val <= 0) return "Select connection";
                  return true;
                },
              }}
              render={({ field, fieldState }) => {
                const currentValue = field.value;
                const hasOption =
                  typeof currentValue === "number" &&
                  counters.some(
                    (c) => c.counter_connection_id === currentValue
                  );

                const selectValue =
                  extCounterEnabled && hasOption ? currentValue : "";
                return (
                  <>
                    <FormSelect
                      {...field}
                      displayEmpty
                      disabled={!extCounterEnabled || isLoading || isError}
                      variant="outlined"
                      value={selectValue}
                      onChange={(e) => {
                        const raw = e.target.value;

                        const connectionId = raw === "" ? null : Number(raw);

                        field.onChange(connectionId);

                        const selected =
                          typeof connectionId === "number"
                            ? counters.find(
                                (c) => c.counter_connection_id === connectionId
                              )
                            : undefined;

                        setValue(
                          "mbox.counter_device_id",
                          selected?.device_id ?? null,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                      }}
                    >
                      <MenuItem value="">
                        {isLoading
                          ? "Loading..."
                          : isError
                          ? "Failed to load"
                          : "Select counter"}
                      </MenuItem>

                      {counters.map((c) => (
                        <MenuItem
                          key={`${c.counter_connection_id}-${c.device_id}-${c.serial}`}
                          value={c.counter_connection_id}
                        >
                          {`${c.device_name} (${c.counter_connection_id} : ${c.device_id} : ${c.serial})`}
                        </MenuItem>
                      ))}
                    </FormSelect>

                    <HelperText>
                      {fieldState.error?.message ??
                        (isError ? "Failed to load counters" : " ")}
                    </HelperText>
                  </>
                );
              }}
            />
          </FormControl>
        </FormRow>

        <Controller
          name="mbox.counter_device_id"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            validate: (val) => {
              if (typeof val !== "number") return true;
              if (val <= 0) return "Id must be greater than 0";
              if (!Number.isInteger(val)) return "Id must be an integer";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Device id" labelWidth="25%">
              <FormInput
                {...field}
                type="number"
                id="mbox-device-id"
                value={field.value ?? ""}
                onChange={makeNumberChangeHandler(field)}
                disabled={!extCounterEnabled}
                slotProps={{ htmlInput: { step: 1, min: 1 } }}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.counter_clean_timeout"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            min: { value: 0.1, message: "Clean timeout must be ≥ 0.1" },
            validate: (value) =>
              hasMax2Decimals(value) ||
              "Clean timeout can have at most 2 decimal places",
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Clean timeout" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                type="number"
                id="mbox-clean-timeout"
                onChange={makeNumberChangeHandler(field)}
                disabled={!extCounterEnabled}
                slotProps={{ htmlInput: { min: "0.1", step: "any" } }}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.counter_miss_timeout"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            min: { value: 0.1, message: "Miss timeout must be ≥ 0.1" },
            validate: (value) =>
              hasMax2Decimals(value) ||
              "Miss timeout can have at most 2 decimal places",
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Miss timeout" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                type="number"
                id="mbox-miss-timeout"
                onChange={makeNumberChangeHandler(field)}
                disabled={!extCounterEnabled}
                slotProps={{ htmlInput: { min: "0.1", step: "any" } }}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <FormRow label="Strategy" labelWidth="25%">
          <FormControl fullWidth>
            <Controller
              name="mbox.miss_strategy"
              control={control}
              rules={{
                required: extCounterEnabled
                  ? "Required when ext counter enabled"
                  : false,
              }}
              render={({ field, fieldState }) => (
                <>
                  <FormSelect
                    {...field}
                    disabled={!extCounterEnabled}
                    variant="outlined"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {strategy.map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </FormSelect>
                  <HelperText>{fieldState.error?.message ?? " "}</HelperText>
                </>
              )}
            />
          </FormControl>
        </FormRow>

        <Controller
          name="mbox.miss_insert_limit"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
            validate: (val) => {
              if (typeof val !== "number") return true;
              if (val <= 0) return "Insert limit must be greater than 0";
              if (!Number.isInteger(val))
                return "Insert limit must be an integer";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Insert limit" labelWidth="25%">
              <FormInput
                {...field}
                type="number"
                id="mbox-insert-limit"
                value={field.value ?? ""}
                onChange={makeNumberChangeHandler(field)}
                disabled={!extCounterEnabled}
                slotProps={{ htmlInput: { step: 1, min: 1 } }}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
              />
            </FormRow>
          )}
        />

        <Controller
          name="mbox.miss_error_label"
          control={control}
          rules={{
            required: extCounterEnabled
              ? "Required when ext counter enabled"
              : false,
          }}
          render={({ field, fieldState }) => (
            <FormRow label="Error label" labelWidth="25%">
              <FormInput
                {...field}
                value={field.value ?? ""}
                id="mbox-error-label"
                disabled={!extCounterEnabled}
                fullWidth
                helperText={fieldState.error?.message ?? " "}
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
