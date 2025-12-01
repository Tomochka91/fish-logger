import type { SerialPort } from "../shared/types";
import { request } from "./apiClient";

// SERIAL PORTS
export const getSerialPorts = async (): Promise<SerialPort[]> => {
  const data = await request<SerialPort[]>("/serial-ports/available");
  console.log(data);
  return data;
};
