export interface StateInterface {
  emergencyHaltWallet: string; // Wallet address to be used to halt contract in the event of an emergency   
  protocolFeePercent: number;  // Percent of orders going to protocol
  pairs: [
    {
      pair: Array<string>[2];
      orders: [
        {
          transaction: string;
          creator: string;
          token: string;
          price: number;
        }
      ];
    }
  ];
}

export interface ActionInterface {
  input: any;
  caller: string;
}

export interface AddPairInterface {
  function: "addPair";
  pair: Array<string>[2];      // Pair that the user wants to initialize
}

export interface CreateOrderInterface {
  function: "createOrder";
  transaction: string;         // Transaction hash from the token transfer to this contract
  pair: Array<string>[2];      // Pair that user is trading between
  price?: number;              // Price of token being sent (optional)
}

export interface RemoveOrderInterface {
  function: "removeOrder";
  transaction: string;         // Transaction hash from the order creation contract interaction
}

export interface HaltInterface {
  function: "halt";
}