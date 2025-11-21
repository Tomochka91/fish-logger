import { IconButton, InputAdornment } from "@mui/material";
import { FormInput } from "../form/FormInput/FormInput";
import { BsSearch, BsX } from "react-icons/bs";

type DebugSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DebugSearchBar({ value, onChange }: DebugSearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <FormInput
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Search logs"
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <BsSearch />
            </InputAdornment>
          ),
          endAdornment:
            value.length > 0 ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  size="small"
                  onClick={handleClear}
                >
                  <BsX />
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            ),
        },
      }}
    />
  );
}
