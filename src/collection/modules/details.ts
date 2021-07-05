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

  // TODO: update details
};
