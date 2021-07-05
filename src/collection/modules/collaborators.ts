import {
  ActionInterface,
  UpdateCollaboratorsInterface,
  StateInterface,
} from "../faces";

declare const ContractAssert: any;
declare const SmartWeave: any;

export const UpdateCollaborators = (
  state: StateInterface,
  action: ActionInterface
) => {
  const collaborators = state.collaborators;

  const input: UpdateCollaboratorsInterface = action.input;
  const caller = action.caller;
  const creator: string = SmartWeave.contract.owner;

  ContractAssert(caller in collaborators, "Caller not in collaborators.");

  // TODO: update collaborators
};
