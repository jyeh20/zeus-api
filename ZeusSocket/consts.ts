type ZeusSocketProperty = {
  // Common ZeusSocket Property
  hasIP: boolean;
  hasType: boolean;
  hasSocket: boolean;

  // Additional Properties
  hasIndex: boolean;
};

type Collection = {
  [key: string]: ZeusSocketProperty;
};

const getZeusSocketProperty = ({
  ip = true,
  type = true,
  socket = true,
  index = false,
}): ZeusSocketProperty => {
  return {
    hasIP: ip,
    hasType: type,
    hasSocket: socket,
    hasIndex: index,
  };
};

export const SocketCollectionTypes: Collection = {
  InnateDomain: getZeusSocketProperty({
    index: true,
  }),
};
