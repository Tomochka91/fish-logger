import { type SelectProps } from "@mui/material";
import { BaseSelect } from "./BaseSelect";

const selectMenuPaperSx = {
  mt: "0.4rem",
  borderRadius: "var(--border-radius-main)",
  boxShadow: "0 0.8rem 2rem rgba(15, 30, 40, 0.18)",
  border: "1px solid var(--color-honeydew)",
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--small-font-size)",
};

const selectMenuListSx = {
  p: "0.4rem 0",
  "& .MuiMenuItem-root": {
    fontFamily: "var(--secondary-font)",
    fontSize: "var(--standart-font-size)",
    color: "var(--color-gunmetal)",
    "&:hover": {
      backgroundColor: "var(--color-mint-cream)",
    },
    "&.Mui-selected": {
      backgroundColor: "var(--color-mint-cream)",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "var(--color-mint)",
      color: "var(--color-white)",
    },
  },
};

export type FormSelectProps = SelectProps;

export function FormSelect(props: FormSelectProps) {
  const { MenuProps, ...rest } = props;

  return (
    <BaseSelect
      {...rest}
      MenuProps={{
        PaperProps: {
          sx: {
            ...selectMenuPaperSx,
            ...MenuProps?.sx,
          },
        },
        MenuListProps: {
          sx: {
            ...selectMenuListSx,
            ...MenuProps?.sx,
          },
        },
        ...MenuProps,
      }}
    />
  );
}
