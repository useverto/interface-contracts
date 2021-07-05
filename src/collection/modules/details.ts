import {
  ActionInterface,
  UpdateDetailsInterface,
  StateInterface,
} from "../faces";

declare const ContractAssert: any;

export const UpdateDetails = (
  state: StateInterface,
  action: ActionInterface
) => {
  const collaborators = state.collaborators;

  const input: UpdateDetailsInterface = action.input;
  const caller = action.caller;

  ContractAssert(caller in collaborators, "Caller not in collaborators.");

  return {
    ...state,
    name: input.name ?? state.name,
    description: input.description ?? state.description
  }
};
