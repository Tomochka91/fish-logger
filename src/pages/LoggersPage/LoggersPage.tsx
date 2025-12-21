import styles from "./LoggersPage.module.css";
import { Box, Chip, Fade, Paper, Typography } from "@mui/material";
import { FormRow } from "../../shared/components/form/FormRow/FormRow";
import { FormAutocomplete } from "../../shared/components/form/FormAutocomplete/FormAutocomplete";
import { FormInput } from "../../shared/components/form/FormInput/FormInput";
import { useQuery } from "@tanstack/react-query";
import type { LoggerList } from "../../shared/types";
import {
  getLoggerList,
  getLoggerStatus,
  getLogsMessage,
} from "../../api/apiConnections";
import { useMemo, useState } from "react";
import { defaultAutocompleteSlotProps } from "../../shared/components/form/FormAutocomplete/AutocompleteSlotProps";

type LoggerOption = { id: number; name: string };

type LoggerStateType = "created" | "running" | "stopping" | "stopped" | "error";

const LOGGER_STATE_META: Record<
  LoggerStateType,
  { label: string; colorVar: string }
> = {
  created: {
    label: "created",
    colorVar: "var(--color-tropical-mint)",
  },
  running: {
    label: "running",
    colorVar: "var(--color-jungle-green)",
  },
  stopping: {
    label: "stopping",
    colorVar: "var(--color-prusian-blue)",
  },
  stopped: {
    label: "stopped",
    colorVar: "var(--color-gunmetal)",
  },
  error: {
    label: "error",
    colorVar: "var(--color-bittersweet-shimmer)",
  },
} as const;

export function LoggersPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: loggerList } = useQuery<LoggerList>({
    queryKey: ["logger-list"],
    queryFn: getLoggerList,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const options: LoggerOption[] = useMemo(
    () =>
      (loggerList ?? [])
        .filter((log) => typeof log.id === "number")
        .map((log) => ({ id: log.id as number, name: log.name })),
    [loggerList]
  );

  const selectedOption = useMemo(
    () => options.find((opt) => opt.id === selectedId) ?? null,
    [options, selectedId]
  );

  const { data: logsMessage } = useQuery({
    queryKey: ["runtime-logs", selectedId],
    queryFn: () => getLogsMessage(selectedId!),
    enabled: selectedId !== null,
    refetchInterval: 1000,
  });

  const { messages, errors } = useMemo<{
    messages: string[];
    errors: string[];
  }>(() => {
    if (!logsMessage?.success || !logsMessage.data) {
      return { messages: [], errors: [] };
    }

    return {
      messages: logsMessage.data.messages ?? [],
      errors: logsMessage.data.errors ?? [],
    };
  }, [logsMessage]);

  const hasMessages = messages.length > 0;
  const hasErrors = errors.length > 0;
  const showPanels = hasMessages || hasErrors;

  const { data: loggerStatus } = useQuery({
    queryKey: ["logger-status", selectedId],
    queryFn: () => getLoggerStatus(selectedId!),
    enabled: selectedId !== null,
    refetchInterval: 1000,
  });

  const loggerState: LoggerStateType | null =
    loggerStatus?.success && loggerStatus.data ? loggerStatus.data.state : null;

  const chipMeta = loggerState ? LOGGER_STATE_META[loggerState] : null;

  const showStatusChip = selectedId !== null && chipMeta !== null;

  return (
    <section className={styles.section}>
      <h2>Runtime logs</h2>
      <Box
        sx={{
          display: "flex",
          gap: "var(--gap-medium)",
          alignItems: "stretch",
        }}
      >
        <FormRow label="Select logger:" labelWidth="15%">
          <FormAutocomplete
            fullWidth
            options={options}
            value={selectedOption}
            getOptionLabel={(opt) => (opt as LoggerOption).name}
            onChange={(_e, val) => {
              const newVal = val as LoggerOption | null;
              setSelectedId(newVal?.id ?? null);
            }}
            slotProps={defaultAutocompleteSlotProps}
            renderInput={(params) => (
              <FormInput {...params} placeholder="Select logger" />
            )}
          />
        </FormRow>

        <Box sx={{ minWidth: "7.5rem", display: "flex" }}>
          <Fade in={showStatusChip} timeout={250}>
            <Chip
              label={chipMeta?.label}
              variant="outlined"
              sx={{
                fontFamily: "var(--main-font)",
                fontWeight: "var(--font-weight-8)",
                fontSize: "var(--small-font-size)",
                color: chipMeta?.colorVar,
                borderColor: chipMeta?.colorVar,
                backgroundColor: "transparent",
                height: "100%",
                alignSelf: "stretch",
                borderRadius: "999px",
                minWidth: "7.5rem",
                justifyContent: "center",
              }}
            />
          </Fade>
        </Box>
      </Box>

      {showPanels && (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            gap: "var(--gap-standart)",
          }}
        >
          {hasMessages && (
            <Paper
              elevation={24}
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                p: "var(--pading-equal)",
              }}
            >
              <Typography
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: "var(--standart-font-size)",
                }}
              >
                {messages.join("\n")}
              </Typography>
            </Paper>
          )}

          {hasErrors && (
            <Paper
              elevation={24}
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                p: "var(--pading-equal)",
                fontFamily: "var(--secondary-font)",
              }}
            >
              <Typography
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: "var(--standart-font-size)",
                  fontFamily: "var(--secondary-font)",
                  fontWeight: "var(--font-weight-2)",
                }}
              >
                {errors.join("\n")}
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </section>
  );
}
