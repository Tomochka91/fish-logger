import { Select, styled } from "@mui/material";

export const BaseSelect = styled(Select)({
  background: "var(--color-mint-cream)",
  borderRadius: "var(--border-radius-main)",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-honeydew)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-mint)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-mint)",
    borderWidth: 1,
  },

  "& .MuiSelect-icon": {
    color: "var(--color-jungle-green)",
    fontSize: "2.8rem",
  },

  "& .MuiSelect-select": {
    fontFamily: "var(--secondary-font)",
    fontSize: "var(--medium-font-size)",
    color: "var(--color-gunmetal)",
    padding: "var(--padding-special)",
    display: "flex",
    alignItems: "center",
  },
});
