import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormInput = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    lineHeight: "var(--line-height-medium)",
  },
  "& .MuiOutlinedInput-root": {
    padding: 0,
    background: "var(--color-mint-cream)",
    borderRadius: "var(--border-radius-main)",
    "& fieldset": {
      borderColor: "var(--color-honeydew)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-mint)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-mint)",
      borderWidth: 1,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "var(--standart-font-size)",
    fontFamily: "var(--secondary-font)",
    color: "var(--color-gunmetal)",
    padding: "var(--padding-special-small)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "var(--color-honeydew)",
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    margin: "0.4rem 0 0 0",
    fontSize: "var(--small-font-size)",
    fontFamily: "var(--secondary-font)",
    lineHeight: "var(--line-height-standart)",
    color: "var(--color-indian-red)",
    minHeight: "1.2rem",
  },
});
