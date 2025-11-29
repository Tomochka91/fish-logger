export type DBSettings = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  sslmode?:
    | "disable"
    | "allow"
    | "prefer"
    | "require"
    | "verify-ca"
    | "verify-full";
};

export type DBaction = "test" | "save";
