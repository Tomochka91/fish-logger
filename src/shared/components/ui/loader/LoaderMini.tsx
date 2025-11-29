import { Box } from "@mui/material";

interface LoaderMiniProps {
  size?: number;
  thickness?: number;
  color?: string;
  secondaryColor?: string;
}

export function LoaderMini({
  size = 16,
  thickness = 2,
  color = "var(--color-indian-red)",
  secondaryColor = "rgba(0, 0, 0, 0.1)",
}: LoaderMiniProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${thickness}px solid ${secondaryColor}`,
        borderTopColor: color,
        animation: "spin 0.6s linear infinite",
        display: "inline-block",
        "@keyframes spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      }}
    />
  );
}
