type IP = {
  [key: string]: number;
};

type Const = {
  [key: string]: number | string;
};

export const InnateDomainIPMap: IP = process.env.test
  ? {
      "192.168.4.18": 0,
    }
  : {
      "192.168.4.2": 0,
      "192.168.4.3": 1,
      "192.168.6.2": 2,
    };

export const consts: Const = {
  packageSize: 1024,
};

export type ConnectionObject = {
  ZeusConnector: string;
  type: string;
  clientIP: string;
};
