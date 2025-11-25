import { Checkbox, styled } from "@mui/material";

export const FormCheckbox = styled(Checkbox)({
  padding: "0",
  color: "var(--color-gunmetal)",

  "&.Mui-checked": {
    color: "var(--color-mint)",
  },

  "& svg": {
    width: "2.8rem",
    height: "2.8rem",
  },
});
