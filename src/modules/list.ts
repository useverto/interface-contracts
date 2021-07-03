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

  const identity = people.find((user) =>
    user.addresses.find((address) => address === caller)
  );
  ContractAssert(identity, "Caller does not have an identity.");

  const token = tokens.find((item) => item.id === id);
  ContractAssert(!token, "Token has already been listed.");

  if (type === "collection") {
    const name = input.name;
    const description = input.description;
    const items = input.items;

    ContractAssert(name, "No name submitted.");
    ContractAssert(description, "No description submitted.");
    ContractAssert(items, "No items submitted.");
    ContractAssert(
      items.length >= 3,
      "A min. amount of 3 items are required to create a collection."
    );

    for (const item of items) {
      const itemToAdd = tokens.find((el) => el.id === item);

      ContractAssert(itemToAdd, `${itemToAdd.id} is not listed.`);
      ContractAssert(
        itemToAdd.lister === identity.username,
        `${itemToAdd.id} is not listed by you.`
      );
      ContractAssert(
        itemToAdd.type === "art",
        `${itemToAdd.id} is not an art.`
      );
    }

    tokens.push({
      id,
      type,
      lister: identity.username,
      name,
      description,
      items,
    });
  } else {
    tokens.push({
      id,
      type,
      lister: identity.username,
    });
  }
  return { ...state, tokens };
};
