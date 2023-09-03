type Const = {
  [key: string]: number | string;
};

export const consts: Const = {
  packageSize: 1024,
};

export type ConnectionObject = {
  ZeusConnector: string;
  type: string;
  clientIP: string;
};
