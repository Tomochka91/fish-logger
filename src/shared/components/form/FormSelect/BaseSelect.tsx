import { Select, styled } from "@mui/material";

export const BaseSelect = styled(Select)({
  background: "var(--color-mint-cream)",
  borderRadius: "var(--border-radius-main)",

  "& .MuiInputBase-root": {
    transition: "none",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-honeydew)",
    transition: "none",
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
    fontSize: "var(--standart-font-size)",
    color: "var(--color-gunmetal)",
    padding: "var(--padding-special-small)",
    display: "flex",
    alignItems: "center",
    transition: "none",
  },
});
