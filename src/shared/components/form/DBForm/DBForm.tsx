import { useForm, useWatch } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { FormRow } from "../FormRow/FormRow";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dbFormValidation } from "../../../utils/validation/dbFormValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import type { DBSettings } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { getDBSettings } from "../../../../api/fish-logger-api";
import {
  useDBSettingsSave,
  useDBSettingsTest,
} from "../../../hooks/useDBSettings";

const defaultDbValues: DBSettings = {
  host: "192.162.1.56",
  port: 5432,
  user: "",
  password: "",
  database: "fishing",
};

const baseButtonSx = {
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  lineHeight: "var(--line-height-medium)",
  padding: "var(--padding-special)",
  borderRadius: "var(--border-radius-medium)",
  textTransform: "var(--text-uppercase)",
};

export function DBForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<DBSettings>({
    defaultValues: defaultDbValues,
  });

  const {
    data: dbSettings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["DBSettings"],
    queryFn: getDBSettings,
  });

  const [isTested, setIsTested] = useState(false);
  const [testedValues, setTestedValues] = useState<DBSettings | null>(null);

  const watchedValues = useWatch({ control });

  const { testMutate, isTesting } = useDBSettingsTest();
  const { saveMutate, isSaving } = useDBSettingsSave();

  const handleTestSettings = handleSubmit((values) => {
    setIsTested(false);
    testMutate(values, {
      onSuccess: () => {
        setIsTested(true);
        setTestedValues(values);
      },
      onError: () => setIsTested(false),
    });
    console.log("DB Form Data to test:", values);
  });

  const handleSaveSettings = handleSubmit((values) => {
    saveMutate(values);
    console.log("DB Form Data to save:", values);
  });

  useEffect(() => {
    if (!testedValues) return;

    const hasChanges =
      JSON.stringify(testedValues) !== JSON.stringify(watchedValues);

    if (hasChanges) {
      setIsTested(false);
    }
  }, [watchedValues, testedValues]);

  useEffect(() => {
    if (dbSettings && !isError) {
      reset(dbSettings);
    }
  }, [dbSettings, reset, isError]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      component="form"
      onSubmit={handleSaveSettings}
      sx={{
        maxWidth: "50%",
        mt: "var(--margin-huge)",
        p: "var(--padding-big)",
        borderRadius: "var(--border-radius-medium)",
        border: "var(--border-standart)",
        boxShadow: 3,
        bgcolor: "var(--form-background)",
        fontFamily: "var(--secondary-font)",

        "@media (max-width:1024px)": {
          maxWidth: "100%",
        },
      }}
    >
      <Stack
        direction="row"
        spacing="var(--gap-mini)"
        mb="var(--margin-medium)"
      >
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="end"
          spacing="var(--gap-main)"
        >
          <Typography
            variant="inherit"
            component="h4"
            color="var(--color-gunmetal)"
          >
            DataBase connection
          </Typography>

          {isLoading && (
            <Typography
              component="p"
              sx={{
                fontSize: "var(--standart-font-size)",
                fontFamily: "var(--secondary-font)",
                color: "var(--color-jungle-green)",
              }}
            >
              Loading settings...
            </Typography>
          )}

          {isError && (
            <Typography
              component="p"
              sx={{
                fontSize: "var(--standart-font-size)",
                fontFamily: "var(--secondary-font)",
                color: "var(--color-bittersweet-shimmer)",
              }}
            >
              {(error as Error)?.message || "Failed to load DB settings"}
            </Typography>
          )}
        </Stack>
      </Stack>

      <FormRow label="Host">
        <FormInput
          fullWidth
          placeholder="192.162.1.56"
          inputMode="numeric"
          {...register("host", dbFormValidation.ipAddress)}
          error={!!errors.host}
          helperText={errors.host?.message || " "}
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

      <FormRow label="User">
        <FormInput
          fullWidth
          autoComplete="username"
          {...register("user", dbFormValidation.login)}
          error={!!errors.user}
          helperText={errors.user?.message || " "}
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
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormRow>

      <FormRow label="Database">
        <FormInput
          fullWidth
          {...register("database", dbFormValidation.dbName)}
          error={!!errors.database}
          helperText={errors.database?.message || " "}
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
          disabled={isSubmitting || isLoading || isTesting}
          onClick={handleTestSettings}
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
          {isTesting ? (
            <CircularProgress
              size={14}
              sx={{ display: "block", transformOrigin: "center" }}
            />
          ) : (
            "Test connection"
          )}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={isSubmitting || isLoading || isSaving || !isTested}
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
          {isSaving ? (
            <CircularProgress
              size={14}
              sx={{ display: "block", transformOrigin: "center" }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </Box>
    </Box>
  );
}
