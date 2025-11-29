export type SerialPortSettings = {
  port: string;
  baudrate: number;
  databits: number;
  parity: string;
  stopbits: number;
  flowcontrol: string;
  autoconnect: boolean;
  timeout: number;
};

export type SerialPort = {
  name: string;
  description: string;
  hwid: string;
};
