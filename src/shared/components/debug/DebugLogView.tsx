import { useEffect, useRef } from "react";
import type { DebugMessage, DebugMessageLevel } from "../../types/debug";
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
      variant="outlined"
      sx={{
        flex: 1,
        // minHeight: 320,
        // maxHeight: "60vh",
        overflowY: "auto",
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        fontFamily: "monospace",
        fontSize: 14,
      }}
    >
      {messages.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          No messages to show
        </Typography>
      ) : (
        messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              py: 0.5,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-of-type": {
                borderBottom: "none",
              },
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ minWidth: 80, flexShrink: 0 }}
            >
              {formatTimestamp(msg.timestamp)}
            </Typography>

            <Chip
              size="small"
              label={msg.source}
              color={msg.source === "backend" ? "primary" : "default"}
              sx={{ textTransform: "uppercase", fontSize: 10 }}
            />

            {msg.level && (
              <Chip
                size="small"
                label={msg.level}
                color={getLevelColor(msg.level)}
                variant="outlined"
                sx={{ textTransform: "uppercase", fontSize: 10 }}
              />
            )}

            <Typography
              component="pre"
              sx={{
                m: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
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
