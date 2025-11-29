export const defaultAutocompleteSlotProps = {
  paper: {
    sx: {
      mt: "0.4rem",
      borderRadius: "var(--border-radius-main)",
      boxShadow: "0 0.8rem 2rem rgba(15, 30, 40, 0.18)",
      border: "none",
      overflow: "hidden",
    },
  },
  listbox: {
    sx: {
      p: 0,
      m: 0,
      // maxHeight: "22rem",
      border: "1px solid var(--color-honeydew)",
      borderRadius: "var(--border-radius-main)",

      "&:empty": {
        border: "none",
        padding: 0,
        maxHeight: 0,
      },

      "& .MuiAutocomplete-option": {
        fontFamily: "var(--secondary-font)",
        fontSize: "var(--standart-font-size)",
        color: "var(--color-gunmetal)",

        '&[aria-selected="true"]': {
          backgroundColor: "var(--color-mint-cream)",
        },
        '&[data-focus="true"]': {
          backgroundColor: "var(--color-mint)",
          color: "var(--color-white)",
        },
      },
    },
  },
};
