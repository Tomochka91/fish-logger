import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";

export function useDeleteLogger() {
  const queryClient = useQueryClient();

  const { mutate: removeLogger, isPending: isDeleting } = useMutation<
    void,
    Error,
    number
  >({
    mutationFn: (logId) => deleteLogger(logId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logger-list"] });
      toast.success("Logger successfully deleted");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { removeLogger, isDeleting };
}
