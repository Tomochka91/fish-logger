import type { EasySerialField, LoggerType } from "../../../types";

export type LoggerFormValues = {
  name: string;
  type: LoggerType;
  autostart: boolean;
  db_user: string;
  db_password: string;
  table_name: string;
  enabled: boolean;
  query_template: string;
  easy_serial: {
    port: {
      port: string;
      baudrate: number;
      databits: number;
      parity: string;
      stopbits: number;
      flowcontrol: string;
      autoconnect: boolean;
    };
    parser: {
      preamble: string;
      terminator: string;
      separator: string;
      encoding: string;
      fields: EasySerialField[];
    };
  } | null;
};

export const defaultLoggerValues: LoggerFormValues = {
  name: "",
  type: "",
  autostart: false,
  db_user: "",
  db_password: "",
  table_name: "",
  enabled: false,
  query_template: "",
  easy_serial: {
    port: {
      port: "",
      baudrate: 9600,
      databits: 8,
      parity: "None",
      stopbits: 1,
      flowcontrol: "None",
      autoconnect: false,
    },
    parser: {
      preamble: "",
      terminator: "\\n",
      separator: ";",
      encoding: "utf-8",
      fields: [],
    },
  },
};
