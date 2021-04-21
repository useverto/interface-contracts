import { ActionInterface, ListInterface, StateInterface } from "../faces";

declare const ContractAssert: any;

export const List = (state: StateInterface, action: ActionInterface) => {
  const people = state.people;
  const tokens = state.tokens;
  const caller = action.caller;

  const input: ListInterface = action.input;
  const id = input.id;
  const type = input.type;

  ContractAssert(
    /[a-z0-9_-]{43}/i.test(id),
    "Caller did not supply a valid token ID."
  );
  ContractAssert(
    type === "art" || type === "community" || type === "custom",
    "Caller did not supply a valid token type."
  );

  const owner = people.find((user) =>
    user.addresses.find((address) => address === caller)
  );
  ContractAssert(owner, "Caller does not have an identity.");

  ContractAssert(!(id in tokens), "Token has already been listed.");

  tokens[id] = {
    type,
    owner: owner.username,
  };
  return { ...state, tokens };
};