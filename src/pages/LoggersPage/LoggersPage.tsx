import styles from "./LoggersPage.module.css";
import { Box, Paper, Typography } from "@mui/material";
import { FormRow } from "../../shared/components/form/FormRow/FormRow";
import { FormAutocomplete } from "../../shared/components/form/FormAutocomplete/FormAutocomplete";
import { FormInput } from "../../shared/components/form/FormInput/FormInput";
import { useQuery } from "@tanstack/react-query";
import type { LoggerList } from "../../shared/types";
import { getLoggerList, getLogsMessage } from "../../api/apiConnections";
import { useMemo, useState } from "react";
import { defaultAutocompleteSlotProps } from "../../shared/components/form/FormAutocomplete/AutocompleteSlotProps";

type LoggerOption = { id: number; name: string };

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
    refetchInterval: 5000,
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

  return (
    <section className={styles.section}>
      <h2>Runtime logs</h2>
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
              elevation={1}
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
              elevation={1}
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
