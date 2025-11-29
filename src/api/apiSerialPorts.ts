import type { SerialPort } from "../shared/types";
import { request } from "./apiClient";

// SERIAL PORTS
export const getSerialPorts = async (): Promise<SerialPort[]> => {
  const data = await request<SerialPort[]>("/serial-ports/available");

  if (!data) {
    throw new Error("Failed to load port");
  }

  return data;
};
