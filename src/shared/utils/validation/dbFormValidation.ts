import { ipRegex } from "./regex";

export const dbFormValidation = {
  ipAddress: {
    required: "IP Address is required",
    pattern: {
      value: ipRegex,
      message: "Invalid IPv4 address",
    },
  },
  port: {
    required: "Port is required",
    valueAsNumber: true,
    min: { value: 1, message: "Port must be ≥ 1" },
    max: { value: 65535, message: "Port must be ≤ 65535" },
    validate: (value: number) =>
      Number.isInteger(value) || "Only digits are allowed",
  },
  login: {
    required: "Login is required",
  },
  password: {
    required: "Password is required",
  },
  dbName: {
    required: "DataBase name is required",
  },
} as const;
