import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { FormRow } from "../FormRow/FormRow";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { dbFormValidation } from "../../../utils/validation/dbFormValidation";

type DBFormValuesProps = {
  ipAddress: string;
  port: number;
  login: string;
  password: string;
  dbName: string;
};

const defaultDbValues: DBFormValuesProps = {
  ipAddress: "192.162.1.56",
  port: 5432,
  login: "",
  password: "",
  dbName: "fishing",
};

const baseButtonSx = {
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  lineHeight: "var(--line-height-medium)",
  padding: "var(--padding-special)",
  borderRadius: "var(--border-radius-medium)",
  textTransform: "var(--text-uppercase)",
};

type DbAction = "test" | "save";

type DbStatus =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export function DBForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DBFormValuesProps>({
    defaultValues: defaultDbValues,
  });

  const onSubmit = (data: DBFormValuesProps) => {
    console.log("DB Form Data:", data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [status, setStatus] = useState<DbStatus>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Заготовка под реальный API
  async function sendDbRequest(values: DBFormValuesProps, action: DbAction) {
    const payload = { ...values, dbAction: action };

    console.log("→ would send to backend:", payload);

    // TODO тут потом заменить на fetch/axios:
    // const res = await fetch("/api/db", { method: "POST", body: JSON.stringify(payload) });

    await new Promise((resolve) => setTimeout(resolve, 800)); // имитация сети

    // тут — заглушка результата:
    if (action === "test") {
      const ok = true;
      if (!ok) throw new Error("Cannot connect to database");
    }
  }

  const onTestConnection = async (values: DBFormValuesProps) => {
    setStatus(null);
    setIsTesting(true);
    try {
      await sendDbRequest(values, "test");
      setStatus({ type: "success", message: "Connection successful" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Connection failed. Check settings.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const onSave = async (values: DBFormValuesProps) => {
    setStatus(null);
    try {
      await sendDbRequest(values, "save");
      setStatus({ type: "success", message: "Settings saved" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to save settings.",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: "50%",
        mt: "var(--margin-huge)",
        p: "var(--padding-big)",
        borderRadius: "var(--border-radius-medium)",
        border: "var(--form-border)",
        boxShadow: 3,
        bgcolor: "var(--form-background)",
        fontFamily: "var(--secondary-font)",
      }}
    >
      <Typography
        variant="inherit"
        mb="var(--margin-medium)"
        component="h4"
        color="var(--color-gunmetal)"
      >
        DataBase connection
      </Typography>
      <FormRow label="IP Address">
        <FormInput
          fullWidth
          placeholder="192.162.1.56"
          inputMode="numeric"
          {...register("ipAddress", dbFormValidation.ipAddress)}
          error={!!errors.ipAddress}
          helperText={errors.ipAddress?.message || " "}
        />
      </FormRow>

      <FormRow label="Port">
        <FormInput
          fullWidth
          placeholder="5432"
          inputMode="numeric"
          pattern="[0-9]*"
          {...register("port", dbFormValidation.port)}
          error={!!errors.port}
          helperText={errors.port?.message || " "}
        />
      </FormRow>

      <FormRow label="Login">
        <FormInput
          fullWidth
          autoComplete="username"
          {...register("login", dbFormValidation.login)}
          error={!!errors.login}
          helperText={errors.login?.message || " "}
        />
      </FormRow>

      <FormRow label="Password">
        <FormInput
          fullWidth
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          {...register("password", dbFormValidation.password)}
          error={!!errors.password}
          helperText={errors.password?.message || " "}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={togglePassword} tabIndex={-1}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormRow>

      <FormRow label="DB name">
        <FormInput
          fullWidth
          {...register("dbName", dbFormValidation.dbName)}
          error={!!errors.dbName}
          helperText={errors.dbName?.message || " "}
        />
      </FormRow>
      <Box
        sx={{
          mt: "var(--margin-big)",
          display: "flex",
          gap: "var(--gap-medium)",
        }}
      >
        <Button
          type="button"
          variant="outlined"
          disabled={isSubmitting || isTesting}
          onClick={handleSubmit(onTestConnection)}
          sx={{
            ...baseButtonSx,
            flex: 1,
            color: "var(--color-gunmetal)",
            bgcolor: "var(--color-lemon-chiffon)",
            borderColor: "var(--color-lemon-chiffon)",
            "&:hover": {
              bgcolor: "var(--color-vanilla)",
              borderColor: "var(--color-vanilla)",
            },
          }}
        >
          {isTesting ? "Testing..." : "Test connection"}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isSubmitting || isTesting}
          onClick={handleSubmit(onSave)}
          sx={{
            ...baseButtonSx,
            flex: 1,
            color: "var(--color-gunmetal)",
            bgcolor: "var(--color-tropical-mint)",
            "&:hover": {
              bgcolor: "var(--color-mint)",
            },
          }}
        >
          Save
        </Button>
      </Box>

      {status && (
        <Box sx={{ height: "2rem", mt: "1.2rem" }}>
          <Typography
            sx={{
              fontFamily: "var(--secondary-font)",
              fontSize: "var(--medium-font-size)",
              color:
                status.type === "success"
                  ? "var(--color-jungle-green)"
                  : "var(--color-bittersweet-shimmer)",
            }}
          >
            {status.message}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
