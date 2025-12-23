import { useMemo, useState } from "react";
import { defaultAutocompleteSlotProps } from "../../shared/components/form/FormAutocomplete/AutocompleteSlotProps";
import { FormAutocomplete } from "../../shared/components/form/FormAutocomplete/FormAutocomplete";
import { FormInput } from "../../shared/components/form/FormInput/FormInput";
import { FormRow } from "../../shared/components/form/FormRow/FormRow";
import styles from "./MetricsPage.module.css";
import { useQuery } from "@tanstack/react-query";
import type { LoggerList } from "../../shared/types";
import { getLoggerList, getMetrics } from "../../api/apiConnections";
import { Box, Paper, Typography } from "@mui/material";

type LoggerOption = { id: number; name: string };

export function MetricsPage() {
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

  const { data: metricsMessage } = useQuery({
    queryKey: ["metrics", selectedId],
    queryFn: () => getMetrics(selectedId!),
    enabled: selectedId !== null,
    refetchInterval: 1000,
  });

  const metricsText = useMemo(() => {
    const metrics = metricsMessage?.success
      ? metricsMessage.data.metrics
      : undefined;
    if (!metrics) return "";
    return Object.entries(metrics)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }, [metricsMessage]);

  const extraText = useMemo(() => {
    const extra = metricsMessage?.success
      ? metricsMessage.data.extra
      : undefined;
    if (!extra) return "";
    return Object.entries(extra)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }, [metricsMessage]);

  const showPanels = metricsText.length > 0 || extraText.length > 0;

  return (
    <section className={styles.section}>
      <h2>Metrics</h2>

      <FormRow label="Select logger:" labelWidth="20%">
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
          {metricsText.length > 0 && (
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
                  fontFamily: "var(--secondary-font)",
                  fontWeight: "var(--font-weight-2)",
                }}
              >
                {metricsText}
              </Typography>
            </Paper>
          )}

          {extraText.length > 0 && (
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
                {extraText}
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </section>
  );
}
