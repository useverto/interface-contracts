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

  for (const addr of input.collaborators) {
    ContractAssert(/[a-z0-9_-]{43}/i.test(addr), `Invalid address ${addr}`);
  }

  // loop through the current collaborators
  // only allow removing a collaborator
  // if the caller is the original creator /
  // owner of the contract
  for (const addr of collaborators)
    if (!input.collaborators.includes(addr))
      ContractAssert(
        caller === creator,
        "Caller cannot remove a collaborator."
      );

  // do not allow removing the creator
  ContractAssert(
    input.collaborators.includes(creator),
    "Cannot remove creator from collaborators."
  );

  return { ...state, collaborators: input.collaborators };
};
