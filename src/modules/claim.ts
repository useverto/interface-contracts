import { ActionInterface, ClaimInterface, StateInterface } from "../faces";

declare const ContractAssert: any;

export const Claim = (state: StateInterface, action: ActionInterface) => {
  const people = state.people;
  const caller = action.caller;

  const input: ClaimInterface = action.input;
  const username = input.username;
  const name = input.name;
  const addresses = input.addresses || [];
  const image = input.image;

  ContractAssert(username, "Caller did not supply a valid username.");
  ContractAssert(name, "Caller did not supply a valid name.");
  ContractAssert(
    /[a-z0-9_-]{43}/i.test(image),
    "Caller did not supply a valid image."
  );

  const person = people.find((user) => user.username === username);
  ContractAssert(!person, "Username has already been claimed.");

  people.push({
    username,
    name,
    addresses: [caller, ...addresses],
    image,
  });
  return { ...state, people };
};
