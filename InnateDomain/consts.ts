type IP = {
  [key: string]: number;
};

export const InnateDomainIPMap: IP = process.env.test
  ? {
      "192.168.4.1": 0,
    }
  : {
      "192.168.4.2": 0,
      "192.168.4.3": 1,
      "192.168.6.2": 2,
    };
