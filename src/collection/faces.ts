export interface StateInterface {
  name: string;
  description: string;
  collaborators: string[]; // addresses that can edit this collection
  items: string[]; // id of the tokens in the collection
}

export interface ActionInterface {
  input: any;
  caller: string;
}

// Inputs

export interface UpdateItemsInterface {
  function: "updateItems";
  items: string[]; // new list of items
}

export interface UpdateDetailsInterface {
  function: "updateDetails";
  name: string;
  description: string;
}

export interface UpdateCollaboratorsInterface {
  function: "updateCollaborators";
  collaborators: string[];
}
