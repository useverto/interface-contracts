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
      type: Token;
      owner: string;
      // TODO: Interface for "custom" type.
    };
  };
}

export type Token = "community" | "art" | "custom";

export interface ActionInterface {
  input: any;
  caller: string;
}

// TODO: Module Interfaces.

export interface ListInterface {
  function: "list";
  id: string;
  type: Token;
}

export interface UnlistInterface {
  function: "unlist";
  id: string;
}
