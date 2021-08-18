import { ActionInterface, StateInterface } from "../faces";

declare const ContractAssert: any;

export const Halt = (state: StateInterface, action: ActionInterface) => {
  const caller = action.caller;

  ContractAssert(
    caller === state.emergencyHaltWallet,
    "Caller cannot halt or resume the protocol"
  );

  if (!state.halted) {
    state.halted = true;
  } else {
    state.halted = false;
  }
  return { ...state };
};
