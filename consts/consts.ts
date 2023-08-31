type IP = {
  [key: string]: number;
};

type Const = {
  [key: string]: number | string;
};

export const InnateDomainIPMap: IP = {
  "192.168.4.18": 0,
};

export const consts: Const = {
  packageSize: 1024,
};

export type ConnectionObject = {
  ZeusConnector: string;
  type: string;
  clientIP: string;
};
