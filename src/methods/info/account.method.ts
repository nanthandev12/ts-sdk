import { Address } from 'viem';

/**Open Orders Method */
export interface IOpenOrdersParams {
  user: Address;
  page?: number;
  limit?: number;
}

export interface IOpenOrdersResponse {
  orders: IOpenOrder[];
}

export interface IOpenOrder {
  order_id: number;
  user: Address;
  instrument_id: number;
  instrument: string;
  side: 's' | 'b';
  limit_price: string;
  size: string;
  unfilled: string;
  state: 'open' | 'filled' | 'cancelled' | 'triggered';
  cloid: string;
  tif: 'GTC' | 'IOC' | 'FOK';
  tpsl: 'tp' | 'sl' | '';
  trigger_px: string;
  trigger_price?: string;
  post_only: boolean;
  reduce_only: boolean;
  timestamp: string;
}

/**Positions Method */
export interface IPositionsParams {
  user: Address;
  instrument?: string;
}

export interface IPositionsResponse {}

/**Account Summary Method */
export interface IAccountSummaryParams {
  user: Address;
}

export interface IAccountSummaryResponse {
  total_balance: string;
  total_equity: string;
  total_free: string;
  total_margin: string;
  total_profit_loss: string;
}

/**Referral Summary Method */
export interface IReferralSummaryParams {
  user: Address;
}

export interface IReferralSummaryResponse {}

/**User Fee Info Method */
export interface IUserFeeInfoParams {
  user: Address;
}

export interface IUserFeeInfoResponse {}

/**Account History Method */
export interface IAccountHistoryParams {
  user: Address;
}

export interface IAccountHistoryResponse {}

/**Order History Method */
export interface IOrderHistoryParams {
  user: Address;
  instrumentId?: string;
  limit?: number;
}

export interface IOrderHistoryResponse {}

/**Trade History Method */
export interface ITradeHistoryParams {
  user: Address;
  instrumentId?: string;
  limit?: number;
}

export interface ITradeHistoryResponse {}

/**Funding History Method */
export interface IFundingHistoryParams {
  user: Address;
}

export interface IFundingHistoryResponse {}

/**Transfer History Method */
export interface ITransferHistoryParams {
  user: Address;
}

export interface ITransferHistoryResponse {}

/**Instrument Leverage Method */
export interface IInstrumentLeverageParams {
  user: Address;
  symbol: string;
}

export interface IInstrumentLeverageResponse {}

/**Referral Info Method */
export interface IReferralInfoParams {
  user: Address;
}

export interface IReferralInfoResponse {}

/**Sub Accounts List Method */
export interface ISubAccountsListParams {
  user: Address;
}

export interface ISubAccountsListResponse {}

/**Agents Method */
export interface IAgentsParams {
  user: Address;
}

export interface IAgentsResponse {}

/**User Balance Info Method */
export interface IUserBalanceInfoParams {
  user: Address;
  type: 'all' | 'spot' | 'derivative';
}

export interface IUserBalanceInfoResponse {}

/**Account Info Method */
export interface IAccountInfoParams {
  user: Address;
  collateralID?: number;
  includeHistory?: boolean;
}

export interface IAccountInfoResponse {}
