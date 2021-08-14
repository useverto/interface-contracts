import { ActionInterface, StateInterface, AddPairInterface } from "../faces";

declare const ContractAssert: any;

export const AddPair = (state: StateInterface, action: ActionInterface) => {
  const caller = action.caller;
  const input: AddPairInterface = action.input;

  const pairs = state.pairs;
  const newPair = input.pair;

  // Test that pairs are valid contract strings
  ContractAssert(
    /[a-z0-9_-]{43}/i.test(newPair[0]) || /[a-z0-9_-]{43}/i.test(newPair[1]),
    "One of two supplied pairs is invalid"
  );

  // TODO: Test that each pair is a valid contract

  // Test if pair already exists
  for (let i = 0; i < pairs.length; i++) {
    const currentPair = pairs[i].pair;
    ContractAssert(
      currentPair.includes(newPair[0]) && currentPair.includes(newPair[1]),
      "This pair already exists"
    );
  }

  state.pairs.push({
      pair: newPair,
      orders: []
  });
  return { ...state };
};
