import { ActionInterface, StateInterface, UnlistInterface } from "../faces";

declare const ContractAssert: any;

export const Unlist = (state: StateInterface, action: ActionInterface) => {
  const people = state.people;
  const tokens = state.tokens;
  const caller = action.caller;

  const input: UnlistInterface = action.input;
  const id = input.id;

  const index = tokens.findIndex((token) => token.id === id);
  ContractAssert(index > -1, "Token has not been listed.");

  const owner = people.find((user) =>
    user.addresses.find((address) => address === caller)
  );
  ContractAssert(owner, "Caller does not have an identity.");
  ContractAssert(
    tokens[id].owner === owner.username,
    "Caller is not the owner of the token."
  );

  tokens.splice(index);
  return { ...state, tokens };
};
