import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormInput = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    lineHeight: "var(--line-height-standart)",
  },
  "& .MuiOutlinedInput-root": {
    lineHeight: "var(--line-height-standart)",
    padding: 0,
    paddingRight: "1.4rem",
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
    color: "var(--color-blue-munsell)",
    opacity: 0.5,
  },
  "& .MuiFormHelperText-root": {
    margin: "0.2rem 0 0 0",
    fontSize: "var(--mini-font-size)",
    fontFamily: "var(--secondary-font)",
    lineHeight: "var(--line-height-standart)",
    color: "var(--color-indian-red)",
    minHeight: "0.8rem",
  },
});
