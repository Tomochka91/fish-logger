import { useForm, useWatch } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { FormRow } from "../FormRow/FormRow";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dbFormValidation } from "../../../utils/validation/dbFormValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import type { DBSettings } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getDBSettings } from "../../../../api/apiDB";
import {
  useDBSettingsSave,
  useDBSettingsTest,
} from "../../../hooks/useDBSettings";
import { TestButton } from "../../ui/button/TestButton";
import { SaveButton } from "../../ui/button/SaveButton";
import { PasswordInput } from "../PasswordInput/PasswordInput";

const defaultDbValues: DBSettings = {
  host: "192.162.1.56",
  port: 5432,
  user: "",
  password: "",
  database: "fishing",
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
        mt: "var(--margin-standart)",
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
          id="host"
          fullWidth
          placeholder="192.162.1.56"
          inputMode="decimal"
          {...register("host", dbFormValidation.ipAddress)}
          helperText={errors.host?.message || " "}
        />
      </FormRow>

      <FormRow label="Port">
        <FormInput
          id="port"
          fullWidth
          placeholder="5432"
          inputMode="numeric"
          pattern="[0-9]*"
          {...register("port", dbFormValidation.port)}
          helperText={errors.port?.message || " "}
        />
      </FormRow>

      <FormRow label="User">
        <FormInput
          id="user"
          fullWidth
          autoComplete="username"
          {...register("user", dbFormValidation.login)}
          helperText={errors.user?.message || " "}
        />
      </FormRow>

      <FormRow label="Password">
        <PasswordInput
          id="db-auth-secret"
          fullWidth
          type="text"
          autoComplete="off"
          masked={!showPassword}
          {...register("password", dbFormValidation.password)}
          helperText={errors.password?.message || " "}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: "0.6rem" }}>
                  <IconButton
                    edge="end"
                    onClick={togglePassword}
                    tabIndex={-1}
                    sx={{
                      p: 0,
                      "& svg": { width: "1.8rem", height: "1.8rem" },
                    }}
                  >
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
          id="database"
          fullWidth
          {...register("database", dbFormValidation.dbName)}
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
        <TestButton
          loading={isTesting}
          disabled={isSubmitting || isLoading}
          onClick={handleTestSettings}
        />
        <SaveButton
          loading={isSaving}
          disabled={isSubmitting || isLoading || !isTested}
          fullWidth
        />
      </Box>
    </Box>
  );
}
