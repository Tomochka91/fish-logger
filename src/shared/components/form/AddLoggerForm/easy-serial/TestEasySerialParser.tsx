import { useFormContext } from "react-hook-form";
import type { LoggerFormValues } from "../loggerForm.types";
import { useMemo, useState } from "react";
import { useEasySerialParserTest } from "../../../../hooks/useEasySerialParserTest";
import { mapParserFormToSettings } from "../mappers/mapParserFormToSettings";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { FormInput } from "../../FormInput/FormInput";
import { TestButton } from "../../../ui/button/TestButton";
import { HelperText } from "../../FormHelperText/HelperText";

export function TestEasySerialParser() {
  const { getValues } = useFormContext<LoggerFormValues>();
  const [rawText, setRawText] = useState("");

  const {
    mutate: testParser,
    data,
    error,
    isPending,
    isError,
  } = useEasySerialParserTest();

  const handleTest = () => {
    const values = getValues();

    testParser({
      raw_text: rawText,
      parser_settings: mapParserFormToSettings(values),
    });
  };

  const output = useMemo(() => {
    if (!data) return "";
    return data.error ? data.error : JSON.stringify(data.parsed, null, 2);
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-standart)",
        fontFamily: "var(--secondary-font)",
        padding: "var(--pading-equal) 0",
        borderTop: "var(--border-standart)",
      }}
    >
      <Typography
        component="h3"
        sx={{ fontFamily: "inherit", fontSize: "var(--medium-font-size)" }}
      >
        Test Easy Serial Parser
      </Typography>

      <Stack direction="row" spacing="var(--gap-standart)">
        <FormInput
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          multiline
          minRows={3}
          placeholder="Paste raw text here…"
          fullWidth
          helperText={" "}
        />

        <TestButton
          onClick={handleTest}
          loading={isPending}
          label="Test"
          sx={{ alignSelf: "start" }}
        ></TestButton>
      </Stack>

      {isError && (
        <HelperText sx={{ color: "var(--color-indian-red)" }}>
          {error?.message}
        </HelperText>
      )}

      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          padding: "var(--padding-mini)",
          minHeight: 0,
          fontFamily: "inherit",
          whiteSpace: "pre-wrap",
          fontSize: "14px",
        }}
      >
        {output || (
          <Typography sx={{ fontFamily: "inherit", opacity: 0.6 }}>
            Response will appear here
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
