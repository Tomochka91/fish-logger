import { Autocomplete, autocompleteClasses, styled } from "@mui/material";

export const FormAutocomplete = styled(Autocomplete)({
  [`& .${autocompleteClasses.inputRoot}`]: {
    padding: 0,
  },
  [`& .${autocompleteClasses.inputRoot} .MuiInputBase-input`]: {
    padding: "var(--padding-special) !important",
  },

  "& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator": {
    padding: "0",
  },
  "& .MuiAutocomplete-popupIndicator svg, & .MuiAutocomplete-clearIndicator svg":
    {
      fontSize: "2.8rem",
      color: "var(--color-jungle-green)",
    },
});
