import { useEffect, useRef } from "react";
import type { DebugMessage, DebugMessageLevel } from "../../types";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { formatTimestamp } from "../../utils/formatTimestamp";

type DebugLogViewProps = {
  messages: DebugMessage[];
  autoscroll: boolean;
};

export function DebugLogView({ messages, autoscroll }: DebugLogViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoscroll) return;

    const element = containerRef.current;

    if (!element) return;

    element.scrollTop = element.scrollHeight;
  }, [messages, autoscroll]);

  const getLevelColor = (level?: DebugMessageLevel) => {
    switch (level) {
      case "error":
        return "error";
      case "warn":
        return "warning";
      case "info":
        return "default";
    }
  };

  return (
    <Paper
      ref={containerRef}
      elevation={24}
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        p: "var(--pading-equal)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--gap-mini)",
        fontFamily: "var(--secondary-font)",
        fontSize: "var(--standart-font-size)",
      }}
    >
      {messages.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            mt: "var(--margin-big)",
            fontFamily: "var(--secondary-font)",
            fontSize: "var(--medium-font-size)",
            color: "var(--color-rich-black)",
          }}
        >
          No messages to show
        </Typography>
      ) : (
        messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              gap: "var(--gap-standart)",
              justifyContent: "center",
              alignItems: "center",
              py: "var(--padding-mini)",
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-of-type": {
                borderBottom: "none",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                width: "max-content",
                color: "var(--color-cadet-grey)",
                fontSize: "var(--mini-font-size)",
                fontFamily: "var(--secondary-font)",
              }}
            >
              {formatTimestamp(msg.timestamp)}
            </Typography>

            <Chip
              size="small"
              label={msg.source}
              color={msg.source === "back" ? "primary" : "default"}
              sx={{
                textTransform: "uppercase",
                fontSize: "var(--mini-font-size)",
                fontFamily: "var(--secondary-font)",
              }}
            />

            {msg.level && (
              <Chip
                size="small"
                label={msg.level}
                color={getLevelColor(msg.level)}
                variant="outlined"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "var(--mini-font-size)",
                  fontFamily: "var(--secondary-font)",
                }}
              />
            )}

            <Typography
              component="pre"
              sx={{
                m: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
                fontSize: "var(--small-font-size)",
                fontFamily: "var(--secondary-font)",
                fontWeight: "var(--font-weight-1)",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))
      )}
    </Paper>
  );
}
