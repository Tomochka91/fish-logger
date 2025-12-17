import { useMutation } from "@tanstack/react-query";
import type {
  EasySerialParserTest,
  EasySerialParserTestResponse,
} from "../types";
import { postEasySerialParserTest } from "../../api/apiConnections";

export function useEasySerialParserTest() {
  return useMutation<EasySerialParserTestResponse, Error, EasySerialParserTest>(
    { mutationFn: postEasySerialParserTest }
  );
}
