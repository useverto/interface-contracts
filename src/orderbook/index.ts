import { StateInterface, ActionInterface } from "./faces";
import { Halt } from "./modules/halt";
import { AddPair } from "./modules/addPair";

declare const ContractError: any;
declare const ContractAssert: any;

export async function handle(state: StateInterface, action: ActionInterface) {
  switch (action.input.function) {
    case "addPair":
      ContractAssert(!state.halted, "The contract is currently halted")
      return { state: await AddPair(state, action) };

    case "createOrder":
      ContractAssert(!state.halted, "The contract is currently halted")
      return { result: Balance(state, action) };

    case "cancelOrder":
      ContractAssert(!state.halted, "The contract is currently halted")
      return { state: Mint(state, action) };

    case "halt":
      return { state: Halt(state, action) };

    default:
      throw new ContractError(`Invalid function: "${action.input.function}"`);
  }
}
