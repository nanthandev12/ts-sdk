/**Blocks Method */
export interface IBlocksMethodParams {
  offset: number;
  limit: number;
}

export interface IBlocksMethodResponse {}

/**Block Method */
export interface IBlockDetailsMethodParams {
  block_hash?: string;
  block_height?: number;
}

export interface IBlockDetailsMethodResponse {}

/**Transactions Method */
export interface ITransactionsMethodParams {
  offset?: number;
  limit?: number;
  filter?: {
    account?: string;
    tx_type?: number;
  };
}

export interface ITransactionsMethodResponse {}

/**Transaction Method */

export interface ITransactionDetailsMethodParams {
  tx_hash: string;
}

export interface ITransactionDetailsMethodResponse {}
