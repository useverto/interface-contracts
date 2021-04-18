export interface StateInterface {
  people: {
    username: string;
    name: string;
    addresses: string[];
    image: string;
    // TODO: Interface for social links.
  }[];

  tokens: {
    [id: string]: {
      type: "community" | "art" | "custom";
      // TODO: Interface for "custom" type.
    };
  };
}

export interface ActionInterface {
  input: any;
  caller: string;
}

// TODO: Module Interfaces.
