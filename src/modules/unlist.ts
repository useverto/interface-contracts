import { ActionInterface, StateInterface, UnlistInterface } from "../faces";

declare const ContractAssert: any;

export const Unlist = (state: StateInterface, action: ActionInterface) => {
  const people = state.people;
  const tokens = state.tokens;
  const caller = action.caller;

  const input: UnlistInterface = action.input;
  const id = input.id;

  ContractAssert(id in tokens, "Token has not been listed.");

  const owner = people.find((user) =>
    user.addresses.find((address) => address === caller)
  );
  ContractAssert(owner, "Caller does not have an identity.");
  ContractAssert(
    tokens[id].owner === owner.username,
    "Caller is not the owner of the token."
  );

  delete tokens[id];
  return { ...state, tokens };
};
