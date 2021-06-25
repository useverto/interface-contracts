export interface StateInterface {
  people: {
    username: string;
    name: string;
    addresses: string[];
    image?: string;
    bio?: string;
    links?: {
      [identifier: string]: string;
    };
  }[];

  tokens: Array<TokenInterface | CollectionInterface>;
}

export type TokenType = "community" | "art" | "custom";

export interface ActionInterface {
  input: any;
  caller: string;
}

// TODO: Module Interfaces.

export interface ClaimInterface {
  function: "claim";
  username: string;
  name: string;
  addresses?: string[];
  image?: string;
  bio?: string;
  links?: {
    [identifier: string]: string;
  };
}

export interface ListInterface {
  function: "list";
  id: string;
  type: TokenType | "collection";
}

export interface UnlistInterface {
  function: "unlist";
  id: string;
}

// Tokens & Collections

interface TokenInterface {
  id: string;
  type: TokenType;
  lister: string;
}

interface CollectionInterface {
  id: string;
  name: string;
  description: string;
  type: "collection";
  items: string[];
  lister: string;
}
