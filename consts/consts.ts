type IP = {
  [key: string]: number;
};

type Const = {
  [key: string]: number | string;
};

const ip_map: IP = {
  "192.168.4.18": 1,
};

const consts: Const = {
  packageSize: 1024,
};

export { ip_map };
