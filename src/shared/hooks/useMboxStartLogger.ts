import { useMutation } from "@tanstack/react-query";
import { startMboxLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";

type MboxStartVariables = {
  logId: number;
  send: boolean;
};

export function useMboxStartLogger() {
  const { mutate: mboxStart, isPending: isMboxStarting } = useMutation<
    string,
    unknown,
    MboxStartVariables
  >({
    mutationFn: ({ logId, send }) => startMboxLogger(logId, send),

    onError: (err) => {
      const msg = getErrorMessage(err, "Something went wrong");
      if (msg.includes("Serial port is not open")) {
        toast("First start the logger (worker), then send the command.", {
          icon: "⚠️",
        });
        return;
      }
      toast.error(msg);
    },
  });

  return { mboxStart, isMboxStarting };
}
