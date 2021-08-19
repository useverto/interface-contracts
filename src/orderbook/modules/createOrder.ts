import {
  ActionInterface,
  StateInterface,
  CreateOrderInterface,
} from "../faces";

declare const ContractAssert: any;
declare const SmartWeave: any;

export const createOrder = async (
  state: StateInterface,
  action: ActionInterface
) => {
  const caller = action.caller;
  const input: CreateOrderInterface = action.input;

  const pairs = state.pairs;
  const usedPair = input.pair;
  const tokenTx = input.transaction;
  const price = input.price;

  // Test that pairs are valid contract strings
  ContractAssert(
    /[a-z0-9_-]{43}/i.test(usedPair[0]) && /[a-z0-9_-]{43}/i.test(usedPair[1]),
    "One of two supplied pairs is invalid"
  );

  // Test if pair already exists
  for (let i = 0; i < pairs.length; i++) {
    const currentPair = pairs[i].pair;
    ContractAssert(
      !currentPair.includes(usedPair[0]) && !currentPair.includes(usedPair[1]),
      "This pair already exists"
    );
  }

  // Test tokenTx for valid contract interaction
  const {
    validity: contractTxValidities,
  } = await SmartWeave.contracts.readContractState(
    "TOKEN CONTRACT ID",
    undefined,
    true
  ); // TODO

  // The transfer tx of the token somewhy does not exist
  ContractAssert(
    tokenTx in contractTxValidities,
    "Could not find transfer transaction"
  );

  // Invalid transfer
  ContractAssert(
    contractTxValidities[tokenTx],
    "The transfer transaction is an invalid interaction"
  );

  // Check for limit order or market order
  if (price) {
    // Limit order
  } else {
    // Market order
  }

  state.pairs.push({
    pair: usedPair,
    orders: [],
  });
  return { ...state };
};
