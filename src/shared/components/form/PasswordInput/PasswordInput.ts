import { styled } from "@mui/material";
import { FormInput } from "../FormInput/FormInput";

type PasswordInputProps = {
  masked?: boolean;
};

export const PasswordInput = styled(FormInput, {
  shouldForwardProp: (prop) => prop !== "masked",
})<PasswordInputProps>(({ masked }) => ({
  "& .MuiInputBase-input": {
    WebkitTextSecurity: masked ? "disc" : "none",
  },
}));
