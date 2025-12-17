import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";

export function useDeleteLogger() {
  const queryClient = useQueryClient();

  const { mutate: removeLogger, isPending: isDeleting } = useMutation<
    void,
    unknown,
    number
  >({
    mutationFn: (logId) => deleteLogger(logId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logger-list"] });
      toast.success("Logger successfully deleted");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, "Something went wrong"));
    },
  });

  return { removeLogger, isDeleting };
}
