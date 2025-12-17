import { useMutation } from "@tanstack/react-query";
import type { DBSettings } from "../types";
import { postDBSettings } from "../../api/apiDB";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";

export function useDBSettingsTest() {
  const { mutate: testMutate, isPending: isTesting } = useMutation({
    mutationFn: (values: DBSettings) =>
      postDBSettings({
        action: "test",
        settings: values,
      }),

    onSuccess: () => {
      toast.success("Connection successful");
    },

    onError: (err) => {
      toast.error(getErrorMessage(err, "Connection test failed"));
    },
  });

  return { testMutate, isTesting };
}

export function useDBSettingsSave() {
  const { mutate: saveMutate, isPending: isSaving } = useMutation({
    mutationFn: (values: DBSettings) =>
      postDBSettings({
        action: "save",
        settings: values,
      }),

    onSuccess: () => {
      toast.success("Settings saved");
    },

    onError: (err) => {
      toast.error(getErrorMessage(err, "Failed to save settings"));
    },
  });

  return { saveMutate, isSaving };
}
