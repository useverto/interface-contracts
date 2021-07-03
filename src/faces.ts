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

  tokens: TokenInterface[];
}

export type TokenType = "community" | "art" | "collection" | "custom";

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

export interface ListInterface extends CollectionExtraData {
  function: "list";
  id: string;
  type: TokenType;
}

export interface UnlistInterface {
  function: "unlist";
  id: string;
}

// Tokens & Collections

interface TokenInterface extends CollectionExtraData {
  id: string;
  type: TokenType;
  lister: string;
}

interface CollectionExtraData {
  name?: string;
  description?: string;
  items?: string[]; // ids of tokens
}
