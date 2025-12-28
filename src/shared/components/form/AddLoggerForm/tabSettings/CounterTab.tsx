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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMboxAvailableCounters } from "../../../../../api/apiConnections";
import type { LoggerList } from "../../../../types";

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

  const type = watch("type");
  const extCounterEnabled = !!watch("mbox.ext_counter");
  const selectedConnectionId = watch("mbox.counter_connection_id");
  const currentDeviceId = watch("mbox.counter_device_id");

  const queryClient = useQueryClient();
  const loggerList = useMemo(
    () => queryClient.getQueryData<LoggerList>(["logger-list"]) ?? [],
    [queryClient]
  );

  const {
    data: availableCountersList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mbox-available-counters", type],
    queryFn: getMboxAvailableCounters,
    enabled: type === "mbox",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  const counters = useMemo(
    () => availableCountersList?.data ?? [],
    [availableCountersList?.data]
  );
  type CounterOption = (typeof counters)[number] & { __inUse?: boolean };

  const makeCombo = (connId: number, devId: number) => `${connId}:${devId}`;

  const inUseOption = useMemo<CounterOption | null>(() => {
    if (!extCounterEnabled) return null;
    if (typeof selectedConnectionId !== "number") return null;
    if (typeof currentDeviceId !== "number") return null;

    const existsInAvailable = counters.some(
      (c) =>
        c.counter_connection_id === selectedConnectionId &&
        c.device_id === currentDeviceId
    );
    if (existsInAvailable) return null;

    const counterLogger = loggerList.find(
      (l) => l.type === "mbox_counter" && l.id === selectedConnectionId
    );

    const device = counterLogger?.mbox_counter?.devices?.find(
      (d) => d.device_id === currentDeviceId
    );

    return {
      counter_connection_id: selectedConnectionId,
      counter_connection_name:
        counterLogger?.name ?? `Counter #${selectedConnectionId}`,
      device_id: currentDeviceId,
      device_name: device?.name ?? `Device #${currentDeviceId}`,
      serial: device?.serial ?? 0,
      runtime_state: "in_use",
      total_count: 0,
      __inUse: true,
    } as CounterOption;
  }, [
    extCounterEnabled,
    selectedConnectionId,
    currentDeviceId,
    counters,
    loggerList,
  ]);

  const counterOptions: CounterOption[] = useMemo(
    () => (inUseOption ? [inUseOption, ...counters] : counters),
    [inUseOption, counters]
  );

  useEffect(() => {
    if (!extCounterEnabled) {
      clearErrors(MBOX_COUNTER_DEFAULT_PATHS.map(([path]) => path));
      MBOX_COUNTER_DEFAULT_PATHS.forEach(([path, value]) => {
        setValue(path, value);
      });
    }
  }, [extCounterEnabled, clearErrors, setValue]);

  useEffect(() => {
    if (!extCounterEnabled) return;
    if (typeof selectedConnectionId !== "number") return;

    const pairIsValid =
      typeof currentDeviceId === "number" &&
      counterOptions.some(
        (c) =>
          c.counter_connection_id === selectedConnectionId &&
          c.device_id === currentDeviceId
      );

    if (pairIsValid) return;

    const firstForConn = counters.find(
      (c) => c.counter_connection_id === selectedConnectionId
    );
    if (!firstForConn) return;

    setValue("mbox.counter_device_id", firstForConn.device_id ?? null, {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [
    extCounterEnabled,
    selectedConnectionId,
    currentDeviceId,
    counters,
    counterOptions,
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
                const comboValue =
                  extCounterEnabled &&
                  typeof selectedConnectionId === "number" &&
                  typeof currentDeviceId === "number" &&
                  counterOptions.some(
                    (c) =>
                      c.counter_connection_id === selectedConnectionId &&
                      c.device_id === currentDeviceId
                  )
                    ? makeCombo(selectedConnectionId, currentDeviceId)
                    : "";

                return (
                  <>
                    <FormSelect
                      name={field.name}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      displayEmpty
                      disabled={!extCounterEnabled || isLoading || isError}
                      variant="outlined"
                      value={comboValue}
                      onChange={(e) => {
                        const raw = String(e.target.value);

                        if (raw === "") {
                          field.onChange(null);
                          setValue("mbox.counter_device_id", null, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                          return;
                        }

                        const [connStr, devStr] = raw.split(":");
                        const connectionId = Number(connStr);
                        const deviceId = Number(devStr);

                        field.onChange(connectionId);
                        setValue("mbox.counter_device_id", deviceId, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    >
                      <MenuItem value="">
                        {isLoading
                          ? "Loading..."
                          : isError
                          ? "Failed to load"
                          : "Select counter"}
                      </MenuItem>

                      {counterOptions.map((c, i) => (
                        <MenuItem
                          key={`${c.counter_connection_id}-${c.device_id}-${
                            c.serial ?? "na"
                          }-${i}`}
                          value={makeCombo(
                            c.counter_connection_id,
                            c.device_id
                          )}
                        >
                          {`${c.device_name} (${c.counter_connection_id} : ${
                            c.device_id
                          }${c.serial != null ? ` : ${c.serial}` : ""})${
                            c.__inUse ? " (in use)" : ""
                          }`}
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
