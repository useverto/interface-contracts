import {
  ActionInterface,
  UpdateItemsInterface,
  StateInterface,
} from "../faces";

declare const ContractAssert: any;

export const UpdateItems = (state: StateInterface, action: ActionInterface) => {
  const collaborators = state.collaborators;

  const input: UpdateItemsInterface = action.input;
  const caller = action.caller;

  ContractAssert(caller in collaborators, "Caller not in collaborators.");

  for (const itemID of input.items) {
    ContractAssert(
      /[a-z0-9_-]{43}/i.test(itemID),
      `Invalid token ID ${itemID}`
    );
  }

  return { ...state, items: input.items };
};
